# DekHor Portal (ศูนย์รวมเด็กหอ)

## What is it?
This mini-project is part of software development practice 2, mainly towards project management and workflow integrations. We combines multiple projects altogether, some are from previous subject and some are rewritten, with addition of central portal to access application, including:
- **DekHor Blog**: An application that user can write and read blogs
- **DekHor Dorm**: To helps student find dorm near their university or wherever desired
- **DekHor Market**: Let users sell things

## Folder Structure
The project is structured as follows:
```
root/
│
├── super-app/ # Contains main portal source code
│ ├── web/
│ └── server/
│
├── hornaidee/ # Contains DekHor Dorms source code
│ ├── web/
│ └── server/
│
├── MarketConnect/ # Contains DekHor Markets source code
│ ├── web/
│ └── server/
│
└── TuachuayDekHor/ # Contains DekHor Blogs source code
  ├── web/
  └── server/
```

## Deploying
To deploy this whole projects, you will need
- Supabase
- 1 Cluster running Kubernetes
- Sentry (I'm trying to remove this but I can't)
- A github account
- Container register

You may begin with `/helm` folder and github action file to get the sense of the environment variable and secret you need.

For sentry, you must create 1 Sentry project for each of sub-project. The total Sentry project will be 8. This must be configure before deploying, otherwise it will fail.

## Demo showcase

![alt text](showcase-image/image.png)
