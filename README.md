w3ui
====

FrontEnd Template

## Prerequisite

Install `sass`:
```
sudo gem install sass
```

Install `compass`:
```
gem install compass
```

Install `yoeman`:
```
npm install -g yo
```

Install `bower`:
```
npm install -g grunt-cli bower
```


## Usage
#Yoeman
```
yo angular:controller myController
yo angular:directive myDirective
yo angular:filter myFilter
yo angular:service myService
```

#Bower
```
# Search for a dependency in the Bower registry.
bower search <dep>

# Install one or more dependencies.
bower install <dep>..<depN>

# List out the dependencies you have installed for a project.
bower list

# Update a dependency to the latest version available.
bower update <dep>
```

#Grunt
```
# Preview an app you have generated (with Livereload).
grunt server

# Run the unit tests for an app.
grunt test

# Build an optimized, production-ready version of your app.
grunt
```
