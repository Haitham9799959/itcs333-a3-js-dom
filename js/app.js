(function () {
  'use strict';

  function init() {
    
    const form = document.querySelector('#todo-form');
    const input = document.querySelector('#todo-input');
    const errorMsg = document.querySelector('#error-msg');
    const list = document.querySelector('#todo-list');
    const counter = document.querySelector('#counter');
    const btnAll = document.querySelector('#filter-all');
    const btnActive = document.querySelector('#filter-active');
    const btnDone = document.querySelector('#filter-done');

    let currentFilter = 'all'; 

    
    function updateCounter() {
      const left = list.querySelectorAll('li:not(.completed)').length;
      counter.textContent = left + (left === 1 ? ' item left' : ' items left');
    }

    function applyFilter() {
      const items = list.querySelectorAll('li');
      for (const li of items) {
        const done = li.classList.contains('completed');
        const show =
          currentFilter === 'all' ||
          (currentFilter === 'active' && !done) ||
          (currentFilter === 'done' && done);
        
        li.hidden = !show;
        li.style.display = show ? '' : 'none';
      }
    }

    function refresh() {
      applyFilter();
      updateCounter();
    }

    function addItem() {
      const text = input.value.trim(); 
      if (text === '') {
        errorMsg.classList.remove('hidden');
        return;
      }
      errorMsg.classList.add('hidden');

      const li = document.createElement('li'); 
      const span = document.createElement('span');
      span.className = 'item-text';
      span.textContent = text; 
      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'delete-btn';
      del.textContent = 'Delete';
      li.appendChild(span);
      li.appendChild(del);
      list.appendChild(li);

      input.value = '';
      input.focus();
      refresh();
    }

    function setFilter(name) {
      currentFilter = name;
      refresh();
    }

    


    function handleSubmit(e) {
      e.preventDefault(); 
      addItem();
    }

    function handleInputKey(e) {
      if (e.key === 'Enter') {
        e.preventDefault(); 
        addItem();
      }
    }




    function handleListClick(e) {
      const li = e.target.closest('li');
      if (!li || !list.contains(li)) return;

      if (e.target.closest('.delete-btn')) {
        li.remove();
      } else if (e.target.closest('.item-text')) {
        li.classList.toggle('completed');
      } else {
        return;
      }
      refresh();
    }

    form.addEventListener('submit', handleSubmit);
    input.addEventListener('keydown', handleInputKey);
    list.addEventListener('click', handleListClick);
    btnAll.addEventListener('click', function () { setFilter('all'); });
    btnActive.addEventListener('click', function () { setFilter('active'); });
    btnDone.addEventListener('click', function () { setFilter('done'); });

    refresh();
  }

  


  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

