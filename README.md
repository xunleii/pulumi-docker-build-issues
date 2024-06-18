# pulumi-docker-build - Example of issues with promise in Dockerfile

[![Open in GitHub Codespaces](https://img.shields.io/badge/Open_in_Github_Codespace-black?logo=github)](https://github.com/codespaces/new?hide_repo_select=true&ref=issue-96/allow-empty-inline-on-preview&repo=812770909)

## How to test ?
> I recommend to run this inside a DevContainer or in a Codespace because it automatically compile the "patched" binary.
> NOTE: This DevContainer is unfortunately slow to build and the first run can also be slow.


```
yarn install
pulumi up
```

If you want to use the latest release of the `pulumi-docker-build`, change the version inside the `package.json` then run
`yarn install`.

## What has been tested ?

- [OK] Build an image with Dockerfile, without context and without build on preview
- [OK] Build an image without Dockerfile nor context and without build on preview
- [OK] Build an image without Dockerfile, with context and without build on preview
- [OK] Build an image with Dockerfile with unknown values, with context and without build on preview
- **[KO] Build an image with Dockerfile with unknown values, without context and without build on preview**
- [OK] Build an image with Dockerfile, without context and with build on preview
- [OK] Build an image without Dockerfile nor context and with build on preview
- [OK] Build an image without Dockerfile, with context and with build on preview
- **[KO] Build an image with Dockerfile with unknown values, with context and with build on preview**
- [OK] Build an image with Dockerfile with unknown values, without context and with build on preview
