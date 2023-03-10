// Imports the Google Cloud client library
import { BigQuery } from '@google-cloud/bigquery';
import { object, array, number, string } from 'zod';

const bigqueryClient = new BigQuery({
	projectId: 'datatech-platform-prod',
});

const date = object({
	value: string(),
});

const row = object({
	family: string().nullable(),
	version: string().nullable(),
	percent_usage: number(),
	start_date: date,
	end_date: date,
});

const response = await bigqueryClient.query(`
SELECT *
FROM public.browser_usage_90d_window
WHERE end_date = "2023-03-07"
ORDER BY family ASC, version DESC
`);

const rows = array(row)
	.parse(response[0])
	.filter(({ percent_usage }) => percent_usage > 0.01 / 100);

console.log(rows.slice(0, 120));

const browserlist = rows.reduce((json, { family, version, percent_usage }) => {
	if (family === null || version === null) return json;
	json[family] ??= {};
	json[family][version] = percent_usage;
	return json;
}, {});

console.log(browserlist);
