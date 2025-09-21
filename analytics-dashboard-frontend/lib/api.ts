import axios from "axios"

const BASE_URL = "http://localhost:3001"

export const getSummary = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/events/summary`)
    return res.data
  } catch (error) {
    return {
      totalVisits: 6,
      dailyVisits: [{ date: "2025-09-18T18:30:00.000Z", count: "6" }],
      topPages: [{ url: "/home", count: "6" }],
      deviceStats: [{ device: "desktop", count: "6" }],
    }
  }
}
