import path from 'path';
import findUp from 'find-up';
import readPkg from 'read-pkg';

const nextDeps = ["next"];
const reactDeps = ["react-scripts", "react", "react-dom"];
const vueDeps = ["vue", "vue-router"];
const angularDeps = ["@angular/core", "@angular/compiler"];
const svelteDeps = ["svelte"];

const syncSearch = (options) => {
    const filePath = findUp.sync('package.json', options);
    if (!filePath) return;
    return {
        packageJson: readPkg.sync({...options, cwd: path.dirname(filePath)}),
        path: filePath
    };
};

const { packageJson, path } = syncSearch();
const dependencies = Object.keys(packageJson.dependencies || {});
const devDependencies = Object.keys(packageJson.devDependencies || {});
const scripts = Object.keys(packageJson.scripts || {});

let isTypescript = dependencies.includes("typescript") || devDependencies.includes("typescript");
let isNext = nextDeps.some(dep => dependencies.includes(dep));
let isReact = reactDeps.some(dep => dependencies.includes(dep));
let isVue = vueDeps.some(dep => dependencies.includes(dep));
let isAngular = angularDeps.some(dep => dependencies.includes(dep));
let isSvelte = svelteDeps.some(dep => dependencies.includes(dep));

let mostCommonRunScripts = [ "dev", "start", "serve" ];

let runScript = scripts.find(script => mostCommonRunScripts.includes(script));
