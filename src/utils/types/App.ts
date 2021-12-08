export type Direction = 'right' | 'left';

export type Step = 'artists' | 'tracks';

export type SelectedIdsType = { [k in Step]: string[] };
