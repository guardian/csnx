export type CoreWebVitalsPayload = {
	page_view_id: string;
	browser_id: string;
	cls: number;
	cls_target: string;
	inp: number;
	inp_target: string;
	lcp: number;
	lcp_target: string;
	fid: number;
	fcp: number;
	ttfb: number;
	stage: 'CODE' | 'PROD';
};
