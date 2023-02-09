---
'@guardian/eslint-plugin-source-react-components': major
---

Add linkComponents to settings

eslint allows us to specify components which should be treated as 'link components' for linting purposes.
In source-react-components, both Link and ButtonLink will apply props directly to an `<a>` tag. Listing them as link components allows rules like `jsx-no-target-blank` to identify them as links, and to lint their props accordingly.
If you don't have any linting rules which look for link elements then this update should not cause any changes. If you do have rules like this then it is possible that new errors or warnings will be raised, but these will be identifying pre-existing issues in your code.
