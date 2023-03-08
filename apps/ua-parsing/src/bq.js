// Imports the Google Cloud client library
import { BigQuery } from '@google-cloud/bigquery';

const bigqueryClient = new BigQuery({
	projectId: 'datatech-platform-prod',
});

const res = await bigqueryClient.query(`
SELECT *
FROM public.quarterly_browser_stats
WHERE received_date = "2023-03-07"
ORDER BY received_timestamp DESC
LIMIT 10
`);

console.log(res);

for (const r of res) {
	console.log(r);
}
