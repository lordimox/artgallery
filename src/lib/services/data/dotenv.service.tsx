import dotenv from 'dotenv';

dotenv.config({path: '../../../../.env.local'});

export const apiUrl = process.env.NEXT_PUBLIC_ART_API;