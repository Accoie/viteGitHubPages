document.addEventListener('DOMContentLoaded', initializeSidebar);
document.addEventListener('DOMContentLoaded', initializePage);
window.addEventListener('DOMContentLoaded', highlightActiveLink);
window.addEventListener('hashchange', highlightActiveLink);

let employeeData = {
  employee: {},
  documents: [],
  helpContacts: [],
  mentors: []
};

const iconsDirectory = "/viteGitHubPages/icons/"

function createMentorElement(mentor, isMain = false) {
  const mentorDiv = document.createElement('div');
  mentorDiv.className = 'mentors__main__item';

  const titleClass = isMain 
    ? 'helpers__main__list__item__title--yellow' 
    : 'helpers__main__list__item__title--blue';

  const role = isMain ? 'Руководитель' : 'Наставник';

  mentorDiv.innerHTML = `
    <div class="helpers__main__list__item__layout">
      <div class="helpers__main__list__content">
        <img class="helpers__icon" src="${iconsDirectory}${`Photo.svg`}" 
             onerror="this.src='${iconsDirectory}${`Photo.svg`}'"/>
        <h3 class="helpers__main__list__item__name">${mentor.fullName}</h3>
        <h4>${mentor.position}</h4>
        <div class="contact__list">
          ${mentor.phone ? `
            <div class="tooltip">
              <img class="contact__icon" src="${iconsDirectory}${`Frame 5112.svg`}"/>
              <span class="tooltiptext">${mentor.phone}</span>
            </div>` : ''}
          
          ${mentor.email ? `
            <div class="tooltip">
              <img class="contact__icon" src="${iconsDirectory}${`Frame 5144.svg`}"/>
              <span class="tooltiptext">${mentor.email}</span>
            </div>` : ''}
          
          ${mentor.telegram ? `
            <div class="tooltip">
              <img class="contact__icon" src="${iconsDirectory}${`Frame 5145.svg`}"/>
              <span class="tooltiptext">${mentor.telegram}</span>
            </div>` : ''}
          
          ${mentor.mattermost ? `
            <div class="tooltip">
              <img class="contact__icon" src="${iconsDirectory}${`Frame 5146.svg`}"/>
              <span class="tooltiptext">Mattermost: ${mentor.mattermost}</span>
            </div>` : ''}
          
          ${mentor.officeAddress ? `
            <div class="tooltip">
              <img class="contact__icon" src="${iconsDirectory}${`Frame 5147.svg`}"/>
              <span class="tooltiptext">${mentor.officeAddress}</span>
            </div>` : ''}
        </div>
      </div>
      <h5 class="helpers__main__list__item__title ${titleClass}">${role}</h5>
    </div>
  `;

  return mentorDiv;
}

function renderMentors() {
  const container = document.querySelector('.mentors__main__layout');
  if (!container || !employeeData.mentors?.length) return;

  container.innerHTML = '';

  if (employeeData.mentors[0]) {
    container.appendChild(createMentorElement(employeeData.mentors[0], true));
  }

  employeeData.mentors.slice(1).forEach(mentor => {
    container.appendChild(createMentorElement(mentor));
  });
}

function createHelperElement(contact) {
  const li = document.createElement('li');
  li.className = 'helpers__main__list__item';

  li.innerHTML = `
    <div class="helpers__main__list__item__layout">
      <div class="helpers__main__list__content">
        <img class="helpers__icon" src="${iconsDirectory}${`Photo.svg`}"/>
        <h3 class="helpers__main__list__item__name">${contact.fullName}</h3>
        <h4>${contact.position}</h4>
        <div class="list__layout">
          <p>Вопросы:</p>
          <ul class="standart-list">
            ${contact.questions.map(question => `<li>${question}</li>`).join('')}
          </ul>               
        </div>
        <div class="contact__list">
          ${contact.officeAddress ? `
            <div class="tooltip">
              <img class="contact__icon" src="${iconsDirectory}${`Frame 5112.svg`}"/>
              <span class="tooltiptext">${contact.officeAddress}</span>
            </div>` : ''}
          
          ${contact.phone ? `
            <div class="tooltip">
              <img class="contact__icon" src="${iconsDirectory}${`Frame 5145.svg`}"/>
              <span class="tooltiptext">${contact.phone}</span>
            </div>` : ''}
          
          ${contact.email ? `
            <div class="tooltip">
              <img class="contact__icon" src="${iconsDirectory}${`Frame 5144.svg`}"/>
              <span class="tooltiptext">${contact.email}</span>
            </div>` : ''}
          
          ${contact.telegram ? `
            <div class="tooltip">
              <img class="contact__icon" src="${iconsDirectory}${`Frame 5146.svg`}"/>
              <span class="tooltiptext">${contact.telegram}</span>
            </div>` : ''}
          
          ${contact.mattermost ? `
            <div class="tooltip">
              <img class="contact__icon" src="${iconsDirectory}${`Frame 5147.svg`}"/>
              <span class="tooltiptext">Mattermost: ${contact.mattermost}</span>
            </div>` : ''}
        </div>
      </div>
      <h5 class="helpers__main__list__item__title helpers__main__list__item__title--purp">${contact.role}</h5>
    </div>
  `;

  return li;
}

function renderHelpers(helpContacts) {
  const helpersContainer = document.querySelector('.helpers__main__list');
  console.log(helpersContainer)
  if (!helpersContainer) return;

  helpersContainer.innerHTML = '';

  helpContacts.forEach(contact => {
    const helperElement = createHelperElement(contact);
    helpersContainer.appendChild(helperElement);
  });
}
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
      employeeData.helpContacts = parsedData.data?.helpContacts || [];
      employeeData.mentors = parsedData.data?.mentors || [];
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
  const helpContacts = employeeData.helpContacts;
  const mentors = employeeData.mentors;

  updateHomePage(employee);
  renderHelpers(helpContacts);
  renderMentors(mentors)
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



