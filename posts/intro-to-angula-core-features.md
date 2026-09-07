---
title: "Introduction to Angular Framework: Core Features"
date: "2023-08-30"
category: "Frontend"
tags: ["Angular", "TypeScript", "Frontend", "Components"]
description: "An overview of Google Angular: deep dive into component architecture, 2-way data binding, directives, and dependency injection services."
featured: false
---

## What is Angular?

Angular is a popular front-end web application development framework created by Google. It is based on TypeScript, a statically-typed superset of JavaScript, which provides additional features such as type checking and interfaces. Angular is widely used by developers worldwide due to its powerful features, ease of use, and scalability.

## Angular Core Features

### Components

One of the core features of Angular is its component-based architecture. Components are reusable and independent building blocks of an application. They encapsulate the application's functionality and data, and can be easily added, removed, or modified. Here is an example of a simple component in Angular:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-hello-world',
  template: '<h1>Hello, World!</h1>'
})
export class HelloWorldComponent {}
```

In this example, we import the `Component` decorator from the `@angular/core` module. We then define a new component using the `@Component` decorator, which takes an object with various properties. The `selector` property specifies the component's name, which can be used in other components or templates to reference it. The `template` property defines the component's HTML template. Finally, we export the component class to make it available for use in other parts of the application.

### Data Bindings

Another important feature of Angular is its powerful data binding system. Data binding allows us to synchronize data between the component and its view, making it easy to display and manipulate data dynamically. There are four types of data binding in Angular:

- Interpolation: Allows us to embed expressions in the template, which are evaluated and replaced with their values at runtime. Here's an example:

```html
<h1>{{ greeting }}</h1>
```

- Property binding: Allows us to bind a component property to an element's property. Here's an example:

```html
<input [value]="name">
```

- Event binding: Allows us to bind an element's event to a component method. Here's an example:

```html
<button (click)="handleClick()">Click me</button>
```

- Two-way binding: Allows us to bind a component property and an element's property to each other, so that changes in one are automatically reflected in the other. Here's an example:

```html
<input [(ngModel)]="name">
```

### Directives

Directives are another important feature of Angular. They allow us to add behavior to HTML elements, such as showing or hiding elements, altering their appearance, or manipulating their contents. There are two types of directives in Angular:

- Structural directives: Alter the structure of the DOM by adding or removing elements. Examples include `*ngIf`, `*ngFor`, and `*ngSwitch`.

```html
<div *ngIf="showMessage">Hello, World!</div>
```

- Attribute directives: Modify the behavior or appearance of elements by manipulating their attributes. Examples include `ngClass`, `ngStyle`, and `ngModel`.

```html
<input [ngClass]="{ 'is-invalid': isInvalid }" [(ngModel)]="name">
```

### Pipes

Pipes are a useful feature of Angular that allow us to transform data before displaying it in the view. They can be used to format dates, numbers, or strings, or to filter or sort arrays. Here's an example:

```html
<p>{{ date | date: 'dd/MM/yyyy' }}</p>
```

In this example, we use the `date` pipe to format a date in a specific format.

### Modules

Modules are a way to organize an Angular application into logical units of functionality. They can be used to group related components, directives, pipes, and services, and to encapsulate them from the rest of the application. Here's an example of a simple module in Angular:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HelloWorldComponent } from './hello-world.component';

@NgModule({
  declarations: [HelloWorldComponent],
  imports: [BrowserModule],
  bootstrap: [HelloWorldComponent]
})
export class AppModule {}
```

In this example, we import the `NgModule` decorator from the `@angular/core` module. We then define a new module using the `@NgModule` decorator, which takes an object with various properties. The `declarations` property specifies the components, directives, and pipes that belong to the module. The `imports` property specifies the modules that this module depends on. Finally, the `bootstrap` property specifies the component that will be used as the root of the application.

## Conclusion

Angular is a powerful front-end web application development framework that offers a wide range of features and tools for building modern and scalable applications. Its component-based architecture, powerful data binding system, and rich set of directives, pipes, and modules make it a popular choice among developers worldwide. By mastering these core features, developers can build robust and maintainable applications that meet the needs of their users.
