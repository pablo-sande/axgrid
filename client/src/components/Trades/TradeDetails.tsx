import React from 'react'
import { Trade } from '../../types/types'
import { Button, Dialog, DialogTitle } from '@mui/material'
import { camelCaseToSeparatedWords } from '../../utils/string-utils'

type TradeDetailsProps = {
    tradeDetails: Trade
    setTradeDetails: React.Dispatch<React.SetStateAction<string | null>>
    acceptTrade: (trade: Trade) => void
    cancelTrade: (trade: Trade) => void
}

export const TradeDetails = ({
    tradeDetails,
    setTradeDetails,
    acceptTrade,
    cancelTrade,
}: TradeDetailsProps) => {
    const onAcceptTrade = () => {
        setTradeDetails(null)
        acceptTrade(tradeDetails)
    }

    const onCancelTrade = () => {
        setTradeDetails(null)
        cancelTrade(tradeDetails)
    }

    return (
        tradeDetails && (
            <div className="fixed w-full h-full flex">
                <Dialog open={true} fullWidth={true}>
                    <DialogTitle className="font-bold text-2xl">
                        Trade Details
                    </DialogTitle>

                    <RederDetails details={tradeDetails} />

                    <div className="flex flex-row justify-around p-4">
                        <Button
                            disabled={tradeDetails.status !== 'CONFIRMED'}
                            onClick={() => onAcceptTrade()}
                        >
                            Accept Trade
                        </Button>

                        <Button
                            disabled={
                                tradeDetails.status === 'DELIVERED' ||
                                tradeDetails.status === 'CANCELED'
                            }
                            onClick={() => onCancelTrade()}
                        >
                            Cancel Trade
                        </Button>

                        <Button onClick={() => setTradeDetails(null)}>
                            Close
                        </Button>
                    </div>
                </Dialog>
            </div>
        )
    )
}

type RederDetailsProps = {
    details: Trade
}

// This component would be completely replaced by something much more UI friendly.
// It's just a quick way to display the trade details by checking the type of the value.
const RederDetails = ({ details }: RederDetailsProps) => (
    <>
        {details && typeof details === 'object'
            ? Object.entries(details).map(([key, value], index) => (
                  <div
                      key={index}
                      className="flex flex-row w-full px-6 py-2 border-b-2 justify-between"
                  >
                      <div className="p-2 w-1/2 font-bold">
                          {camelCaseToSeparatedWords(key)}
                      </div>

                      <div className="p-2 w-1/2 text-right" aria-label={key}>
                          {value instanceof Array ? (
                              value.map((val, index) => {
                                  return <ObjectKeys key={index} value={val} />
                              })
                          ) : typeof value === 'object' ? (
                              <ObjectKeys value={value} />
                          ) : (
                              (value as React.ReactNode)
                          )}
                      </div>
                  </div>
              ))
            : null}
    </>
)

type ObjectKeysProps = {
    value: any
}

const ObjectKeys = ({ value }: ObjectKeysProps) => (
    <>
        {value
            ? Object.entries(value).map(([key2, value2], index) => {
                  return (
                      <div
                          key={index}
                          className="inline ml-1"
                          aria-label={value}
                      >
                          {typeof value2 === 'boolean'
                              ? value2
                                  ? key2
                                  : null
                              : typeof value2 === 'object'
                              ? null
                              : (value2 as React.ReactNode)}
                      </div>
                  )
              })
            : null}
    </>
)
