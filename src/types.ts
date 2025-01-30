export interface SetupStep {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

export interface Organization {
    name: string;
    website: string;
    description: string;
}
  
export interface WebPage {
    url: string;
    status: 'detected' | 'scraped' | 'pending';
    chunks: string[];
}
