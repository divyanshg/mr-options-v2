type WithUser = {
  user: Record<any, any>;
};

export interface TA extends WithUser {
  data: Record<string, number>[];
  sums: Record<string, number>;
  submittedAt: string;
}

export interface FR extends WithUser {
  scores: Record<string, number>;
  totalScores: {
    row: Record<string, number>;
    cols: Record<string, number>;
    grandTotal: number;
  };
  submittedAt: string;
}

export interface WT extends WithUser {
  counts: number[][];
  maxes: number[];
  sets: string[][];
  responses: Record<string, number>;
  submittedAt: string;
}
