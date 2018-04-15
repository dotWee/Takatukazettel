# Takatukazettel

Minimal todo-list application, built with [MongoDB](https://www.mongodb.com/), [Swagger](https://swagger.io/), [Knockout.js](http://knockoutjs.com/) and [Bootstrap 4](https://getbootstrap.com/). And it runs within a [Docker](https://www.docker.com/) container.

This is my first Node.js application. Recruiters: Please don't look at it.

## Execution

Make sure you have [Docker](https://www.docker.com/) installed and running.

    git clone git@github.com:dotWee/Takatukazettel.git
    cd Takatukazettel
    
Don't forget to update the _MONGO_URL_ variable within the Dockerfile!

    docker-compose up --build

Takatukazettel should now be running on [localhost:10010](http://localhost:10010/).

## Api

Swagger:

The API follows the REST structure and has been developed using [Swagger](https://swagger.io/). You can check out details about the Swagger configuration on [SwaggerHub](https://app.swaggerhub.com/apis/dotWee/Takatukazettel).

## License

The MIT License

Copyright (c) 2010-2017 Lukas "dotwee" Wolfsteiner

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FdotWee%2FTakatukazettel.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FdotWee%2FTakatukazettel?ref=badge_large)