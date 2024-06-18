import * as pulumi from "@pulumi/pulumi";
import * as docker from "@pulumi/docker";
import * as buildx from "@pulumi/docker-build";

// Prepare the environment to test these examples
const alpine = new docker.RemoteImage("alpine", {
  name: "docker.io/library/alpine:3.20.0",
});

// Tests for the github.com/pulumi/pulumi-docker-build#96 issue

new buildx.Image("preview:Dockerfile:NoContext", {
  tags: ["localhost:5000/image/test01:latest"],
  push: false,
  dockerfile: { inline: "FROM alpine\nRUN echo 'Hello, World!'\n" },
});

//* OK: This case must fail because no context is provided (and so no default Dockerfile can be found)
// new buildx.Image("preview:NoDockerfile:NoContext", {
//   tags: ["localhost:5000/image/test02:latest"],
//   push: false,
// });

new buildx.Image("preview:NoDockerfile:Context", {
  tags: ["localhost:5000/image/test03:latest"],
  push: false,
  context: { location: "." },
});

new buildx.Image("preview:DockerfileWithPromise:Context", {
  tags: ["localhost:5000/image/test04:latest"],
  push: false,
  context: { location: "." },
  dockerfile: {
    inline: pulumi.interpolate`FROM ${alpine.repoDigest}\nRUN echo 'Hello, World!'\n`,
  },
});

//! KO: This case must not fail even if the context is not provided
// new buildx.Image("preview:DockerfileWithPromise:NoContext", {
//   tags: ["localhost:5000/image/test05:latest"],
//   push: false,
//   dockerfile: {
//     inline: pulumi.interpolate`FROM ${alpine.repoDigest}\nRUN echo 'Hello, World!'\n`,
//   },
// });

new buildx.Image("buildOnPreview:Dockerfile:NoContext", {
  tags: ["localhost:5000/image/test06:latest"],
  push: false,
  dockerfile: { inline: "FROM alpine\nRUN echo 'Hello, World!'\n" },
  buildOnPreview: true,
});

//* OK: This case must fail because no context is provided (and so no default Dockerfile can be found)
// new buildx.Image("buildOnPreview:NoDockerfile:NoContext", {
//   tags: ["localhost:5000/image/test07:latest"],
//   push: false,
//   buildOnPreview: true,
// });

new buildx.Image("buildOnPreview:NoDockerfile:NoContext", {
  tags: ["localhost:5000/image/test08:latest"],
  push: false,
  context: { location: "." },
  buildOnPreview: true,
});

//! KO: This case must fail because Dockerfile contains promise that are not known at preview time but try to build
//!     to build one based on the Dockefile present in the context
new buildx.Image("buildOnPreview:DockerfileWithPromise:Context", {
  tags: ["localhost:5000/image/test04:latest"],
  push: false,
  context: { location: "." },
  dockerfile: {
    inline: pulumi.interpolate`FROM ${alpine.repoDigest}\nRUN echo 'Hello, World!'\n`,
  },
  buildOnPreview: true,
});

//* OK: This case must fail because Dockerfile contains promise that are not known at preview time
// new buildx.Image("buildOnPreview:DockerfileWithPromise:NoContext", {
//   tags: ["localhost:5000/image/test09:latest"],
//   push: false,
//   dockerfile: {
//     inline: `FROM ${alpine.repoDigest}\nRUN echo 'Hello, World!'\n`,
//   },
//   buildOnPreview: true,
// });
