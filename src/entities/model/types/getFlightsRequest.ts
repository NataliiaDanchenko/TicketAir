export interface GetFlightsRequest {
  airline?: string;
  from?: string;                  
  to?: string;                    
  sortBy?: 'price' | 'airline'; 
  sortOrder?: 'asc' | 'desc';     
  pagination?: {
    page: number;                 
    limit: number;                
  };
}


