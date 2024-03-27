import { renderHook, act } from "@testing-library/react"
import { describe, test, expect, vi, beforeEach } from "vitest"
import useTradeApi from "../src/hooks/useApi"
import { kineticTrade } from "./__mocks__/trades"

global.fetch = vi.fn()


describe("useTradeApi", () => {
  const mockUrl = "https://localhost:3000/api/trades/add"
  const mockMethod = "POST"
  const createFetchResponse = (data: any) => {
    return Promise.resolve({
        json: () => new Promise((resolve) => resolve(data)),
    })
}
const mockResponse = {
    trades: [kineticTrade],
}

  beforeEach(() => {
    vi.resetAllMocks()
  })

  test("should make a successful API request", async () => {
    vi.mocked(fetch).mockResolvedValue(createFetchResponse(mockResponse) as any)

    const { result } = renderHook(() =>
      useTradeApi({ url: mockUrl, method: mockMethod })
    )

    expect(result.current.loading).toBe(false)
    expect(result.current.returnData).toBe(null)
    expect(result.current.error).toBe(null)

    act(() => {
      result.current.makeRequest(kineticTrade)
    })

    expect(result.current.loading).toBe(true)

    vi.waitFor(() => {
      expect(result.current.returnData).toEqual(kineticTrade)
      expect(result.current.error).toBe(null)
    }, { timeout: 1000 })
  })

  test("should handle API request error", async () => {
    const mockError = new Error("API request failed")
    vi.mocked(fetch).mockRejectedValueOnce(mockError)

    const { result } = renderHook(() =>
      useTradeApi({ url: mockUrl, method: mockMethod })
    )

    expect(result.current.loading).toBe(false)
    expect(result.current.returnData).toBe(null)
    expect(result.current.error).toBe(null)

    act(() => {
      result.current.makeRequest(kineticTrade)
    })

    expect(result.current.loading).toBe(true)

    vi.waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.returnData).toBe(null)
      expect(result.current.error).toEqual(mockError)
    }, { timeout: 1000 })

  })
})