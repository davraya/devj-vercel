import axios from 'axios';
import type { JournalResponse, EntryResponse } from '../types/JournalResponse';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const fetchJournal = async (userId: string, token: string): Promise<JournalResponse> => {

  const url = `${API_BASE_URL}/api/journal/${userId}`;

  try {
    const response = await axios.get<JournalResponse>(url,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error fetching journal:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
      });
    } else {
      console.error('Unexpected error fetching journal:', error);
    }
    throw error;
  }
};

export const editEntry = async (
    userId: string,
    token: string,
    entryId: string,
    content: string, 
    title: string
  ): Promise<EntryResponse> => {
    const url = `${API_BASE_URL}/api/journal/${userId}/${entryId}/edit-entry`;
  
    try {
      const response = await axios.patch<EntryResponse>(url, null, {
        params: {
          content,
          title,
        },
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error editing journal entry:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
        });
      } else {
        console.error('Unexpected error editing journal entry:', error);
      }
      throw error;
    }
  };



