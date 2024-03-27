import express from 'express';
import { SocketioServer } from './socketio';
import { createServer } from 'http';
import { Trade } from '../client/src/types/types';

const cors = require('cors');
let trades = require('./trades.json');
const app = express();

new SocketioServer(createServer(app));

let confirmStatusTimeout: NodeJS.Timeout;
let deliveredStatusTimeout: NodeJS.Timeout;

const updateTradeStatus = (trade: Trade, status: string) => {
  trades.trades = trades.trades.map(
    (t: Trade) => t.id === trade.id ? {...t, status} : t);
  SocketioServer.instance.emit('change-trade-status', {...trade, status});
}

const confirmStatus = (trade: Trade) => {
  confirmStatusTimeout = setTimeout(() => {
    updateTradeStatus(trade, 'CONFIRMED');
  }, 15000);
}

const deliveredStatus = (trade: Trade) => {
  deliveredStatusTimeout = setTimeout(() => {
    updateTradeStatus(trade, 'DELIVERED');
  }, 10000);
}

app.use(express.json());
app.use(cors());

app.listen(4000, () => {
    console.log('listening on *:4000');
    SocketioServer.instance.emit('update-trades', trades);
});

app.get('/trades', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.json(trades)
});

// Trades are confirmed after 15 seconds
app.post('/trades/add', (req, res) => {
  trades.trades.push(req.body);
  SocketioServer.instance.emit('add-trade', req.body)
  confirmStatus(req.body);
  res.json(trades)
});

// Trades are executed after 10 seconds
app.put('/trades/change-status', (req, res) => {
  trades.trades = trades.trades.map((t: Trade) => {
    if (t.id === req.body.id) {
      t.status = req.body.status;
    }
    return t;
  });
  SocketioServer.instance.emit('change-trade-status', req.body)
  deliveredStatus(req.body);
  res.json(trades)
});

// Canceled trades are removed after 10 seconds
app.delete('/trades/delete', (req, res) => {
  SocketioServer.instance.emit('change-trade-status', {...req.body, status: 'CANCELED'});
  updateTradeStatus(req.body, 'CANCELED');
  confirmStatusTimeout && clearTimeout(confirmStatusTimeout);
  deliveredStatusTimeout && clearTimeout(deliveredStatusTimeout);
  
  setTimeout(() => {
    trades.trades = trades.trades.filter((t: Trade) => t.id !== req.body.id);
    SocketioServer.instance.emit('delete-trade', req.body)
  }, 10000);
  res.json(trades)
});

app.use((req, res) => {
  const error = new Error('Not found');

  res.status(404).json({
      message: error.message
  });
});