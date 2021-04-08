# IT_BOOK
Aplicación para contar con un directorio de la Industria de TI en Nuevo León y en el Norte de México.

## Table of contents

* [Client Details](#client-details)
* [Environment URLS](#environment-urls)
* [The Team](#the-team)
* [Technology Stack](#technology-stack)
* [Management resources](#management-resources)
* [Setup the project](#setup-the-project)
* [Running the stack for development](#running-the-stack-for-development)
* [Stop the project](#stop-the-project)
* [Restoring the database](#restoring-the-database)
* [Debugging](#debugging)
* [Running specs](#running-specs)
* [Checking code for potential issues](#checking-code-for-potential-issues)

### Client Details

| Name               | Email             | Role |
| ------------------ | ----------------- | ---- |
| Ángeles Vela | angeles.vela@csoftmty.org | Cliente  |


### Environment URLS

* **Production** - [TBD](TBD)
* **Development** - [TBD](TBD)

### The Team

| Name           | Email             | Role        |
| -------------- | ----------------- | ----------- |
| Marlon López | A01139431@itesm.mx | SCRUM Master |
| Daniel Vidaña | A01039800@itesm.mx | Product Owner Proxy |
| Lourdes Navarrete | A01039707@itesm.mx | Administrador del Proyecto |
| Bruno Méndez | A01194018@itesm.mx | Administrador de la Configuración |

### Technology Stack
| Technology    | Version      |
| ------------- | -------------|
| Bootstrap  | 15.0.0     |
| React  | 17    |
| Firebase  | 8.2.7     |

### Management tools

You should ask for access to this tools if you don't have it already:

* [Github repo](https://github.com/ProyectoIntegrador2018/it_book)
<!-- * [Backlog]()
* [Heroku]() -->
* [Documentation](https://teams.microsoft.com/_#/school/files/Equipo%202.2%20-%20C%C3%B3digo%20Naranja?threadId=19:9cf1b08c81ef4a66854f34fcfe6deabd@thread.tacv2&ctx=channel)

## Development

### Setup the project

<!-- You'll definitely want to install [`plis`](https://github.com/IcaliaLabs/plis), as in this case will
let you bring up the containers needed for development. This is done by running the command
`plis start`, which will start up the services in the `development` group (i.e. rails
and sidekiq), along with their dependencies (posgres, redis, etc). -->

You'll definitely want to install the npm package manager, which comes bundled with [`Node.js`](https://nodejs.org/es/download/) when you install it on your system, use version 14.16.0. 

After installing you can follow this simple steps:

* Fire up a terminal

* Clone this repository into your local machine

```bash
$ git clone https://github.com/ProyectoIntegrador2018/it_book.git
```

* Install the project's dependencies:

```bash
$ npm install
```

<!-- 3. Inside the container you need to migrate the database:

```
% rails db:migrate
``` -->

### Running the stack for Development

* Fire up a terminal and run: 

```
npm start
```

<!-- That command will lift every service crowdfront needs, such as the `rails server`, `postgres`, and `redis`.


It may take a while before you see anything, you can follow the logs of the containers with:

```
$ docker-compose logs
``` -->

Once you see an output like this:

```
Compiled successfully!

You can now view itbook in the browser.

  Local:            http://localhost:3000        
  On Your Network:  http://192.168.1.70:3000     

Note that the development build is not optimized.
To create a production build, use yarn build. 
```

This means the project is up and running.

### Stop the project

In order to stop the project from running in your localhost:3000 you can type Control-c for windows or Command-c for mac

After that you will see the following output:

```
Terminate batch job (Y/N)? 
```

Type Y then enter and the project will be stopped.

<!-- In order to stop crowdfront as a whole you can run:

```
% plis stop
```

This will stop every container, but if you need to stop one in particular, you can specify it like:

```
% plis stop web
```

`web` is the service name located on the `docker-compose.yml` file, there you can see the services name and stop each of them if you need to. -->

### Restoring the database

<!-- You probably won't be working with a blank database, so once you are able to run crowdfront you can restore the database, to do it, first stop all services:

```
% plis stop
```

Then just lift up the `db` service:

```
% plis start db
```

The next step is to login to the database container:

```
% docker exec -ti crowdfront_db_1 bash
```

This will open up a bash session in to the database container.

Up to this point we just need to download a database dump and copy under `crowdfront/backups/`, this directory is mounted on the container, so you will be able to restore it with:

```
root@a3f695b39869:/# bin/restoredb crowdfront_dev db/backups/<databaseDump>
```

If you want to see how this script works, you can find it under `bin/restoredb`

Once the script finishes its execution you can just exit the session from the container and lift the other services:

```
% plis start
``` -->

### Debugging

<!-- We know you love to use `debugger`, and who doesn't, and with Docker is a bit tricky, but don't worry, we have you covered.

Just run this line at the terminal and you can start debugging like a pro:

```
% plis attach web
```

This will display the logs from the rails app, as well as give you access to stop the execution on the debugging point as you would expect.

**Take note that if you kill this process you will kill the web service, and you will probably need to lift it up again.** -->

### Running specs

<!-- To run specs, you can do:

```
$ plis run test rspec
```

Or for a specific file:

```
$ plis run test rspec spec/models/user_spec.rb
``` -->

### Checking code for potential issues

<!-- To run specs, you can do:

```
$ plis run web reek
```

```
$ plis run web rubocop
```

```
$ plis run web scss_lint
```

Or any other linter you have. -->
