---
'@guardian/atoms-rendering': major
'@guardian/eslint-plugin-source-foundations': major
'@guardian/eslint-plugin-source-react-components': major
'@guardian/source-foundations': major
'@guardian/source-react-components': major
'@guardian/source-react-components-development-kitchen': major
---

Update border styling across multiple form field components, reducing the default border width from 4px to 2px.

The components affected are Radio Button, Checkbox, Text Input, Text Area, Select Box, Choice Card and User Feedback Summary.

This breaking change will only affect consumers that are not using `box-sizing: border-box;`. In these circumstances consumers may need to adjust their styling to account for thinner borders.
