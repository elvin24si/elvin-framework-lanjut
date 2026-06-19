import axios from 'axios'

const API_URL = "https://golbbyhhotgiaqqnxfay.supabase.co/rest/v1/note"
const API_KEY = "sb_publishable_Egd0p4x-CXldQae16raqkQ_1A9_C3XP"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

export const notesAPI = {
    async fetchNotes() {
        const response = await axios.get(API_URL, { headers })
        return response.data
    },

    async createNote(data) {
        const response = await axios.post(API_URL, data, { headers })
        return response.data
    },

    async deleteNote(id) {
        await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
    }
}