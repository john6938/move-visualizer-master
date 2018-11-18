# Move Visualizer

This app will fetch all files from Google Cloud Storage, display, and annotate them accordingly.

## Technologies

- React: Front-end framework
- TypeScript: Static type checking, helps development smoother and easier
- CSS Modules: Styling method
- Google Cloud: - Storage: Store abstracts' XML files - Firestore: Store abstracts' comments - Function: Make simple API without the need of a full-fledged back-end

## Development

### Requirements

- Node.js >= 8

### Instructions

Run these commands in a command shell

```bash
npm install
npm start
```

The app should be available on `localhost:3000`. Any change made on source codes will makes the page auto-refreshed.

### Change domain logic

You can change most of the domain logic simply by editing these files:

- `src/config/googleCloud.ts`: Bucket name and folders name
- `src/config/moves.ts`: Move types and their own children types
- `src/config/moveColors.ts`: Move colors

## Deployment

### Requirements

Same as development

### Instructions

1.  Update your static host url in the field `"homepage"` in `package.json`
    e.g.

```json
	"homepage": "https://mywebsite.com/move-visualizer"
```

2.  Run this command in a command shell

```
npm run build
```

3.  Your built website will be available in the folder `build/`. You can rename `index.html` if you want to serve it with different name (e.g. `https://mywebsite.com/move-visualizer/main.html`)

## Google Cloud Function

This app uses Google Cloud Function instead of a full-fledged backend to make some simple APIs. Functions' source codes are manually copied into `/cloud-functions` for documentation purpose.
Those APIs are:

- **Comment abstract:** Users can leave comment on abstract and comments are saved in Google Cloud Firestore. Password is in the function's environmental variables and could be changed by using Google Cloud console.

## Note

This app is bootstrapped with [create-react-app](https://github.com/facebook/create-react-app). Refer there for more information.
