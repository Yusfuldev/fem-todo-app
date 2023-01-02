# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)

  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)

- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Screenshot

![Desktop Dark mode](./screenshots/Desktop%20design.png)
![Desktop light mode](./screenshots/Desktop%20design-%20lightmode.png)
![mobile dark mode](./screenshots/Mobile%20design.png)
![mobile light mode](./screenshots/Mobile%20design-light%20mode.png)

### Links

- Solution URL: [Add solution URL here](https://github.com/Yusfuldev/fem-todo-app)
- Live Site URL: [live site](https://fem-todo-by-yusfuldev.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow

### What I learned

- Learnt how to setItem and getItem from local storage
- Learnt the difference between element and node collection

```css
input:checked + label {
  color: blue;
}
```

```js
localStorage.setItem("todoList", JSON.stringify("todo"));
JSON.parse(localStorage.getItem("todoList"));
```

### Continued development

Would look into adding the drag drop feature later

## Author

- Website - [Github](https://www.github.com/yusfuldev)
- Frontend Mentor - [@yusfuldev](https://www.frontendmentor.io/profile/yusfuldev)
- Twitter - [@hadebayo4u](https://www.twitter.com/hadebayo4u)
