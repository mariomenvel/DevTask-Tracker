const API_URL = '/api/tasks';

// Elementos del DOM
const taskForm = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title');
const taskList = document.getElementById('task-list');
const loadingIndicator = document.getElementById('loading');

// Elementos del Modal
const editModal = document.getElementById('edit-modal');
const editTitleInput = document.getElementById('edit-title');
const saveEditBtn = document.getElementById('save-edit');
const cancelEditBtn = document.getElementById('cancel-edit');

let currentEditingId = null;

// Inicialización
document.addEventListener('DOMContentLoaded', fetchTasks);

// Cargar tareas (RA1 AJAX/Fetch)
async function fetchTasks() {
    showLoading(true);
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        renderTasks(data);
    } catch (error) {
        console.error('Error:', error);
        alert('Error al conectar con el servidor');
    } finally {
        showLoading(false);
    }
}

// Renderizar lista (DOM dinámico)
function renderTasks(tasks) {
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        taskList.innerHTML = '<p style="text-align:center;color:var(--text-dim)">Sin tareas pendientes.</p>';
        return;
    }

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <div class="task-info">
                <h3>${task.titulo}</h3>
                <span>${task._id}</span>
            </div>
            <div class="actions">
                <button class="icon-btn edit-btn" onclick="openEditModal('${task._id}', '${task.titulo}')">Edit</button>
                <button class="icon-btn delete-btn" onclick="deleteTask('${task._id}')">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Crear tarea (RA3 Create)
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const titulo = taskTitleInput.value.trim();
    if (!titulo) return;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo, estado: false })
        });

        if (response.ok) {
            taskTitleInput.value = '';
            fetchTasks();
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Eliminar tarea (RA3 Delete)
async function deleteTask(id) {
    if (!confirm('¿Seguro que deseas eliminar esta tarea?')) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (response.ok) fetchTasks();
    } catch (error) {
        console.error('Error:', error);
    }
}

// Abrir modal de edición
function openEditModal(id, currentTitle) {
    currentEditingId = id;
    editTitleInput.value = currentTitle;
    editModal.classList.remove('hidden');
}

// Actualizar tarea (RA3 Update)
saveEditBtn.addEventListener('click', async () => {
    const nuevoTitulo = editTitleInput.value.trim();
    if (!nuevoTitulo || !currentEditingId) return;

    try {
        const response = await fetch(`${API_URL}/${currentEditingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo: nuevoTitulo })
        });

        if (response.ok) {
            closeEditModal();
            fetchTasks();
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

function closeEditModal() {
    editModal.classList.add('hidden');
    currentEditingId = null;
}

cancelEditBtn.addEventListener('click', closeEditModal);

function showLoading(show) {
    loadingIndicator.classList.toggle('hidden', !show);
}
