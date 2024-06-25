export type CoreWebVitalsPayload = {
	page_view_id: string | null;
	browser_id: string | null;
	cls: null | number;
	cls_target: null | string;
	inp: null | number;
	inp_target: null | string;
	lcp: null | number;
	lcp_target: null | string;
	fid: null | number;
	fcp: null | number;
	ttfb: null | number;
};
