 import http from "../utils/http";
import axios from 'axios'

export const getTopicList = (data: any) => http.get(`/api/getTopicList`, data);
export const getPostList = (data: any) => http.get(`/api/getPostList`, data);
export const getList = (data: any) => http.get(`/api/getList`, data);
