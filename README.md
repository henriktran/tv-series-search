## Running and Testing the Code

1. Install Dependencies
   `npm install`
2. Run the Code
   `npm start`
3. Run Tests
   `npm test`

## Features

- Responsive layout
- Keyboard navigation supported
- Catch all error handling (using axios interceptor)

## Possible improvements

If time permits, I would like to add the following:

### Tests

Overall better coverage and more tests of core features

- Test for error handling, making sure feedback to the user are displayed
- Test the click events for displaying the show details
- Test for the correct information in the modal when clicking on a show

### Features

- Having previous search results stored locally (for example using redux) to reduce possible server load
- Loading states
- The api only seem to return maximum of 10 results, so having an informational text about it would be helpful for users

### Code

- Improved structure and organization of the code such as in the styling files
- Adding more reusable code such as components (ex, cards in the search list result)
- Better and more consistent naming of things
- Better setup of types and interfaces, these were created in a quick manner
- Clean up of packages, I added a few packages that I didn't need in the end
