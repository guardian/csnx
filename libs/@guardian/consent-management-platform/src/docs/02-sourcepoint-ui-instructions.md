# Sourcepoint UI instructions

Sourcepoint's UI for messages does not have any version control. Furthermore it is difficult to use and easy to lose work by refreshing or closing the interface without saving - or having someone overwrite all your changes by working on the same file concurrently.

A better way to ensure your change are not lost is to take a copy of the full CSS file by opening the CSS panel in Sourcepoint and with the cursor inside that, using cmd+a, cmd+c to take a copy of the CSS then paste it into a file in your feature branch. You can then make your changes in VSCode then paste them into Sourcepoint's CSS panel for testing. This allows you to take advantage of committing your changes incrementally and rolling back if needed.

Ideally, in the longer term we hope to create a better way of testing locally before pushing the tested changes to Sourcepoint so that this repo becomes the source of truth for the CSS files rather than a (hopeful) reflection of it.

For testing your message, make a note of the message id in SourcePoint's UI. Alter the message_id field in MessageTester.html iFrame URL then spin up MessageTester.html within sourcepoint-ui via Live Server or similar and point your selected browser at localhost.

As you change and save the message in the SourcePoint Portal, those changes will reflect in the browser after a refresh.
