document.addEventListener('DOMContentLoaded', initializeSidebar);
document.addEventListener('DOMContentLoaded', initializePage);
window.addEventListener('DOMContentLoaded', highlightActiveLink);
window.addEventListener('hashchange', highlightActiveLink);

let employeeData = {
  employee: {},
  documents: []
};

function initializeSidebar() {
  document.querySelectorAll('.sidebar-container').forEach(container => {
    const template = document.getElementById('sidebar-template');
    if (!template) return;

    const clone = document.importNode(template.content, true);
    container.appendChild(clone);
  });
}

function highlightActiveLink() {
  const links = document.querySelectorAll('.sidebar__list__link');
  const currentHash = window.location.hash;

  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentHash) {
      link.classList.add('active');
    }
  });
}

async function fetchEmployeeData() {
  const API_URL = 'https://learn-9fc9-git-main-imsokolovivs-projects.vercel.app/api/adaptation/test';
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseText = await response.json();
    console.log(responseText)
    try {
      const parsedData = responseText;
      employeeData.employee = parsedData.data?.employee || {};
      employeeData.documents = parsedData.data?.documents || [];
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
    }
  } catch (error) {
    console.error('Error fetching employee data:', error);
  }
}

function updateElement(id, value) {
  const element = document.getElementById(id);
  if (element && value) 
  { 
    element.textContent = value;
  }
}

function updateHomePage(employee) {
  updateElement('user-name', `${employee.firstName} ${employee.secondName}`);
  updateElement('legal-entity', employee.organization);
  updateElement('department', employee.department);
  updateElement('position', employee.position);
  updateElement('office', employee.officeAddress);
  updateElement('email', employee.email);
  updateElement('organization', employee.organization);
  updateElement('about', employee.about);
}

function updateRequiredDocs(allowedDocs) {
  const items = document.querySelectorAll('.required-docs__main__list__item');
  items.forEach(item => {
    const docName = item.getAttribute('data-doc');
    if (!allowedDocs.includes(docName)) {
      item.style.display = 'none'; 
    }
  });
}

async function initializePage() {
  await fetchEmployeeData(); 

  const employee = employeeData.employee; 

  updateHomePage(employee);

  document.querySelectorAll('.sidebar__user__name').forEach(el => {
    el.textContent = `${employee.firstName} ${employee.secondName}`;
  });

  const photo = document.querySelector('.user__icon');
  if (photo) {
    photo.src = employee.photo || 'icons/Photo.svg';

  }

  const allowedDocs = employeeData.documents;

  updateRequiredDocs(allowedDocs);
}



