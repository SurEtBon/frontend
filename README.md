# frontend

Frontend application built with Tailwind CSS and Leaflet providing an interactive map interface to visualize and explore data.

<table>
    <thead>
        <tr>
            <th>Environment variables</th>
            <th>Value</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>DEBUG</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>BACKEND_URL</td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>

```ShellSession
npm run gulp
```

```ShellSession
npx tailwindcss -i ./src/css/style.css -o ./dist/css/style.css --minify
```

```ShellSession
npm run gulp generate-favicon
```

```ShellSession
npm run gulp inject-favicon-markups
```

```ShellSession
npm run gulp watch
```

```ShellSession
npx tailwindcss -i ./src/css/style.css -o ./dist/css/style.css --watch
```
