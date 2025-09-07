// Gestion des onglets
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

// Gestion de l'upload de fichier
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-upload');

dropZone.addEventListener('click', () => {
    fileInput.click();
});

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.background = '#e0e0e0';
});

dropZone.addEventListener('dragleave', () => {
    dropZone.style.background = '';
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.style.background = '';
    
    if (e.dataTransfer.files.length) {
        fileInput.files = e.dataTransfer.files;
        showNotification(`Fichier "${e.dataTransfer.files[0].name}" prêt pour l'analyse !`, 'success');
    }
});

// Simulation de génération de PDF avec IA
document.getElementById('generate-from-subject').addEventListener('click', generatePDFWithAI);
document.getElementById('generate-from-text').addEventListener('click', generatePDFWithAI);
document.getElementById('generate-guided').addEventListener('click', generatePDFWithAI);

function generatePDFWithAI() {
    const activeTab = document.querySelector('.tab-content.active').id;
    const previewElement = document.getElementById(`preview-${activeTab}`);
    
    // Afficher l'état de chargement avec IA
    previewElement.innerHTML = `
        <div style="text-align: center; padding: 30px 0;">
            <div class="ai-thinking">
                <i class="fas fa-robot"></i>
                <p>L'IA analyse votre demande et génère un contenu optimisé...</p>
            </div>
            <div class="progress-bar">
                <div class="progress" id="progress-bar"></div>
            </div>
        </div>
    `;
    
    // Simuler une barre de progression avec analyse IA
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 5;
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) progressBar.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            showAIPreview(activeTab);
        }
    }, 150);
    
    showNotification('L\'IA génère votre contenu persuasif...', 'ai');
}

function showAIPreview(activeTab) {
    const previewContent = `
        <div style="width: 100%; font-family: 'Montserrat', sans-serif;">
            <h2 style="color: var(--primary); text-align: center; margin-bottom: 20px;">
                <i class="fas fa-robot" style="color: var(--ai-color);"></i> Votre PDF Généré par IA
            </h2>
            <div style="background: linear-gradient(135deg, rgba(155, 89, 182, 0.1) 0%, rgba(142, 68, 173, 0.15) 100%); padding: 20px; border-radius: 10px; margin-bottom: 25px; border-left: 4px solid var(--ai-color);">
                <h3 style="color: var(--ai-dark); margin-bottom: 15px; display: flex; align-items: center;">
                    <i class="fas fa-check-circle" style="color: var(--ai-color); margin-right: 10px;"></i>
                    Contenu optimisé par notre IA
                </h3>
                <p style="color: var(--dark-gray);">Votre PDF persuasif a été généré avec des techniques avancées de marketing et de persuasion.</p>
            </div>
            
            <div style="border: 2px solid var(--medium-gray); padding: 20px; border-radius: 10px; margin-bottom: 25px;">
                <h4 style="color: var(--secondary); margin-bottom: 15px; display: flex; align-items: center;">
                    <i class="fas fa-star" style="color: var(--primary); margin-right: 10px;"></i>
                    Techniques d'IA appliquées :
                </h4>
                <ul style="list-style-type: none; padding-left: 10px;">
                    <li style="margin-bottom: 10px; display: flex; align-items: center;">
                        <i class="fas fa-brain" style="color: var(--ai-color); margin-right: 10px;"></i>
                        Analyse sémantique avancée
                    </li>
                    <li style="margin-bottom: 10px; display: flex; align-items: center;">
                        <i class="fas fa-bullseye" style="color: var(--ai-color); margin-right: 10px;"></i>
                        Ciblage psychographique
                    </li>
                    <li style="margin-bottom: 10px; display: flex; align-items: center;">
                        <i class="fas fa-chart-line" style="color: var(--ai-color); margin-right: 10px;"></i>
                        Optimisation pour la conversion
                    </li>
                    <li style="display: flex; align-items: center;">
                        <i class="fas fa-magic" style="color: var(--ai-color); margin-right: 10px;"></i>
                        Persuasion algorithmique
                    </li>
                </ul>
            </div>
            
            <div style="text-align: center;">
                <button class="btn btn-accent" onclick="downloadPDF()" style="margin-bottom: 15px;">
                    <i class="fas fa-download"></i> Télécharger le PDF
                </button>
                <p style="color: var(--dark-gray); font-size: 0.9rem;">Taille du fichier: ~1.5 MB - Optimisé par IA</p>
            </div>
        </div>
    `;
    
    document.getElementById(`preview-${activeTab}`).innerHTML = previewContent;
    showNotification('Votre PDF généré par IA est prêt !', 'success');
}

// Fonction pour afficher les notifications
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    
    notificationText.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Fonction pour télécharger le PDF (simulée)
function downloadPDF() {
    showNotification('Téléchargement du PDF optimisé par IA...', 'ai');
    
    // Simulation de téléchargement
    setTimeout(() => {
        showNotification('PDF téléchargé avec succès !', 'success');
    }, 1500);
}

// Simulation de suggestions IA en temps réel
const subjectInput = document.getElementById('subject');
subjectInput.addEventListener('blur', () => {
    if (subjectInput.value.length > 5) {
        showNotification('L\'IA a détecté votre sujet et peut générer un contenu pertinent', 'ai');
    }
});
