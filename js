// Data State Management
let currentTab = 'showcase';
let currentProtoScreen = 'screen-form';
let isDarkMode = true;

let activeUserPlan = {
    name: "Alex Rivera",
    userId: "alex_fit",
    age: 26,
    weight: 74,
    goal: "Muscle Gain",
    intensity: "Medium",
    nutritionTip: "Consume a slight caloric surplus (~300 kcal). Aim for 2.0g protein/kg and prioritize sleep.",
    completedDays: [],
    days: [
        { day: "Day 1", title: "Push Day (Chest, Shoulders & Triceps)", warm: "5 mins Arm Circles & Band Pull-Aparts", main: ["4x10 Dumbbell Bench Press", "3x12 Incline Dumbbell Flyes", "3x12 Overhead Dumbbell Press", "3x15 Tricep Pushdowns"], cool: "5 mins Chest Doorway Stretch" },
        { day: "Day 2", title: "Pull Day (Back & Biceps)", warm: "5 mins Lat Activation & Scapular Pulls", main: ["4x10 Lat Pulldowns", "4x10 Bent-Over Rows", "3x12 Single-Arm Dumbbell Rows", "3x12 Bicep Curls"], cool: "5 mins Back Stretch" },
        { day: "Day 3", title: "Legs & Core Focus", warm: "5 mins Bodyweight Squats & Glute Bridges", main: ["4x8 Barbell Squats", "3x10 Romanian Deadlifts", "3x12 Walking Lunges", "3x45s Plank Holds"], cool: "5 mins Quad & Hamstring Stretch" },
        { day: "Day 4", title: "Active Mobility & Recovery", warm: "5 mins Gentle Breathing", main: ["30 mins Steady Mobility Flow", "15 mins Deep Stretching Routine"], cool: "Child's Pose Hold" },
        { day: "Day 5", title: "Upper Body Hypertrophy", warm: "5 mins Arm Swings", main: ["4x10 Incline Press", "4x12 Seated Cable Rows", "3x15 Dumbbell Lateral Raises", "3x12 Hammer Curls"], cool: "5 mins Upper Body Stretch" },
        { day: "Day 6", title: "Lower Body & Core", warm: "5 mins Dynamic Leg Swings", main: ["4x10 Leg Press", "3x12 Hamstring Curls", "3x15 Standing Calf Raises", "3x20 Russian Twists"], cool: "5 mins Pigeon Stretch" },
        { day: "Day 7", title: "Complete Rest Day", warm: "None", main: ["Rest and Recovery Focus", "Optimal Nutrition & Protein Intake"], cool: "Hydration Focus" }
    ]
};

let adminDatabase = [
    { userId: 'alex_fit', name: 'Alex Rivera', age: 26, weight: 74, goal: 'Muscle Gain', intensity: 'Medium', status: 'Active' },
    { userId: 'sarah_runner', name: 'Sarah Chen', age: 24, weight: 61, goal: 'Weight Loss', intensity: 'High', status: 'Active' },
    { userId: 'mark_v', name: 'Mark Vance', age: 31, weight: 82, goal: 'General Fitness', intensity: 'Low', status: 'Completed' }
];

window.onload = function() {
    renderFormPreview();
    renderInteractiveSchedule();
    renderAdminTable();
};

// Theme Switcher Toggle
function toggleTheme() {
    isDarkMode = !isDarkMode;
    const html = document.documentElement;
    const themeIcon = document.getElementById('themeIcon');

    if (isDarkMode) {
        html.classList.remove('light');
        html.classList.add('dark');
        themeIcon.className = 'fa-solid fa-moon text-sm';
    } else {
        html.classList.remove('dark');
        html.classList.add('light');
        themeIcon.className = 'fa-solid fa-sun text-sm text-amber-500';
    }
    showToast(`Switched to ${isDarkMode ? 'Dark' : 'Light'} Mode Theme`);
}

// Tab Switching
function switchMainTab(tabId) {
    currentTab = tabId;
    const showcaseSec = document.getElementById('view-showcase');
    const prototypeSec = document.getElementById('view-prototype');
    const btnShowcase = document.getElementById('tabBtn-showcase');
    const btnProto = document.getElementById('tabBtn-prototype');

    if (tabId === 'showcase') {
        showcaseSec.classList.remove('hidden');
        prototypeSec.classList.add('hidden');
        btnShowcase.className = "px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 bg-orange-500 text-white shadow-md";
        btnProto.className = "px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 text-slate-400 hover:text-slate-200";
    } else {
        showcaseSec.classList.add('hidden');
        prototypeSec.classList.remove('hidden');
        btnProto.className = "px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 bg-orange-500 text-white shadow-md";
        btnShowcase.className = "px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 text-slate-400 hover:text-slate-200";
    }
}

function switchProtoScreen(screenId) {
    currentProtoScreen = screenId;
    ['screen-form', 'screen-plan', 'screen-admin'].forEach(s => {
        const el = document.getElementById(`protoScreen-${s.replace('screen-', '')}`);
        const btn = document.getElementById(`protoNav-${s.replace('screen-', '')}`);
        if (`screen-${s.replace('screen-', '')}` === screenId) {
            el.classList.remove('hidden');
            btn.className = "px-3 py-1.5 rounded-lg text-xs font-bold transition-all bg-orange-500 text-white";
        } else {
            el.classList.add('hidden');
            btn.className = "px-3 py-1.5 rounded-lg text-xs font-bold transition-all text-slate-400 hover:text-white";
        }
    });
}

// Form Submit Generator
async function handleProtoGenerate(e) {
    e.preventDefault();

    const loader = document.getElementById('formLoadingState');
    const card = document.getElementById('formPreviewCard');

    card.classList.add('hidden');
    loader.classList.remove('hidden');

    const name = document.getElementById('inputName').value;
    const userId = document.getElementById('inputUserId').value;
    const age = document.getElementById('inputAge').value;
    const weight = document.getElementById('inputWeight').value;
    const goal = document.getElementById('inputGoal').value;
    const intensity = document.querySelector('input[name="intensity"]:checked').value;

    await new Promise(r => setTimeout(r, 1000));

    activeUserPlan.name = name;
    activeUserPlan.userId = userId;
    activeUserPlan.age = age;
    activeUserPlan.weight = weight;
    activeUserPlan.goal = goal;
    activeUserPlan.intensity = intensity;
    activeUserPlan.completedDays = [];

    renderFormPreview();
    loader.classList.add('hidden');
    card.classList.remove('hidden');

    showToast("New 7-Day Fitness Schedule Synthesized!");
}

function renderFormPreview() {
    document.getElementById('prevTitle').textContent = `7-Day ${activeUserPlan.goal} Plan`;
    document.getElementById('prevSubtitle').textContent = `Tailored for ${activeUserPlan.name} (@${activeUserPlan.userId}) • ${activeUserPlan.intensity} Intensity`;

    const snippet = document.getElementById('prevDaysSnippet');
    snippet.innerHTML = '';

    activeUserPlan.days.forEach(d => {
        const div = document.createElement('div');
        div.className = "p-3 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800/80 light:border-slate-200 text-xs";
        div.innerHTML = `
            <div class="flex items-center justify-between font-bold text-white light:text-slate-900 mb-1">
                <span class="text-orange-400 font-mono">${d.day}</span>
                <span>${d.title}</span>
            </div>
            <div class="text-slate-400 text-[11px] truncate">${d.main.join(', ')}</div>
        `;
        snippet.appendChild(div);
    });
}

function confirmAndSavePlan() {
    renderInteractiveSchedule();
    
    // Sync with admin
    const existing = adminDatabase.find(u => u.userId === activeUserPlan.userId);
    if (!existing) {
        adminDatabase.push({
            userId: activeUserPlan.userId,
            name: activeUserPlan.name,
            age: activeUserPlan.age,
            weight: activeUserPlan.weight,
            goal: activeUserPlan.goal,
            intensity: activeUserPlan.intensity,
            status: 'Active'
        });
        renderAdminTable();
    }

    switchProtoScreen('screen-plan');
    showToast("Plan activated! View your weekly routine.");
}

// Interactive Schedule Renderer
function renderInteractiveSchedule() {
    document.getElementById('planUserInitials').textContent = activeUserPlan.name.split(' ').map(n=>n[0]).join('').toUpperCase().substring(0,2);
    document.getElementById('planUserName').textContent = activeUserPlan.name;
    document.getElementById('planUserHandle').textContent = `@${activeUserPlan.userId}`;
    document.getElementById('planGoal').textContent = activeUserPlan.goal;
    document.getElementById('planIntensity').textContent = `${activeUserPlan.intensity} Intensity`;

    const grid = document.getElementById('interactiveDaysGrid');
    grid.innerHTML = '';

    activeUserPlan.days.forEach((day, index) => {
        const isChecked = activeUserPlan.completedDays.includes(index);
        const card = document.createElement('div');
        card.className = `p-5 rounded-3xl glass-panel border transition-all ${isChecked ? 'border-green-500/40 bg-green-500/5' : 'border-slate-800'}`;

        card.innerHTML = `
            <div class="space-y-4">
                <div class="flex items-center justify-between border-b border-slate-800/80 pb-3">
                    <span class="text-xs font-mono font-bold text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-lg border border-orange-500/20">${day.day}</span>
                    <label class="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-300">
                        <input type="checkbox" onchange="toggleDayCompletion(${index})" ${isChecked ? 'checked' : ''} class="w-4 h-4 rounded text-orange-500 focus:ring-orange-500 bg-slate-950 border-slate-700">
                        <span class="${isChecked ? 'text-green-400' : 'text-slate-400'}">${isChecked ? 'Done ✓' : 'Mark Done'}</span>
                    </label>
                </div>

                <h4 class="text-base font-bold text-white light:text-slate-900 font-display">${day.title}</h4>

                <div class="p-3 rounded-xl bg-slate-950/70 light:bg-slate-100 text-xs border border-slate-800/60">
                    <span class="text-[10px] font-extrabold uppercase text-amber-400 block mb-0.5">🔥 Warm-Up</span>
                    <p class="text-slate-300 light:text-slate-700">${day.warm}</p>
                </div>

                <div class="space-y-1.5">
                    <span class="text-[10px] font-extrabold uppercase text-orange-400 block">💪 Main Exercises</span>
                    <ul class="text-xs text-slate-200 light:text-slate-800 space-y-1">
                        ${day.main.map(m => `<li class="flex items-center gap-2"><i class="fa-solid fa-angle-right text-orange-500 text-[10px]"></i><span>${m}</span></li>`).join('')}
                    </ul>
                </div>

                <div class="pt-3 border-t border-slate-800/80 text-xs">
                    <span class="text-[10px] font-extrabold uppercase text-cyan-400 block">🧘 Cooldown</span>
                    <p class="text-slate-400 light:text-slate-600 text-[11px]">${day.cool}</p>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    updateProgressBar();
}

function toggleDayCompletion(index) {
    const idx = activeUserPlan.completedDays.indexOf(index);
    if (idx >= 0) {
        activeUserPlan.completedDays.splice(idx, 1);
    } else {
        activeUserPlan.completedDays.push(index);
    }
    renderInteractiveSchedule();
}

function updateProgressBar() {
    const pct = Math.round((activeUserPlan.completedDays.length / 7) * 100);
    document.getElementById('progressPercentText').textContent = `${pct}%`;
    document.getElementById('progressBarFill').style.width = `${pct}%`;
}

function handlePlanRevision(e) {
    e.preventDefault();
    const input = document.getElementById('revisionPrompt');
    const val = input.value.trim();
    if (!val) return;

    activeUserPlan.days = activeUserPlan.days.map(d => {
        let updated = [...d.main];
        if (val.toLowerCase().includes('core') || val.toLowerCase().includes('abs')) {
            updated.push("3x20 Hanging Leg Raises");
        } else {
            updated.push(`Added Custom Request: ${val.substring(0, 25)}...`);
        }
        return { ...d, main: updated };
    });

    renderInteractiveSchedule();
    input.value = '';
    showToast("AI updated your schedule based on feedback!");
}

// Admin Table Functions
function renderAdminTable() {
    const body = document.getElementById('adminTableBody');
    body.innerHTML = '';

    adminDatabase.forEach(u => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-slate-800/40 light:hover:bg-slate-100 transition-colors";

        tr.innerHTML = `
            <td class="py-4 px-6 font-mono text-orange-400 font-bold">@${u.userId}</td>
            <td class="py-4 px-6">
                <div class="font-bold text-white light:text-slate-900">${u.name}</div>
                <div class="text-[11px] text-slate-400">${u.age} yrs • ${u.weight} kg</div>
            </td>
            <td class="py-4 px-6 text-slate-300 light:text-slate-700 font-semibold">${u.goal}</td>
            <td class="py-4 px-6">
                <span class="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-800 text-slate-300 border border-slate-700">${u.intensity}</span>
            </td>
            <td class="py-4 px-6">
                <span class="px-2 py-0.5 text-[10px] font-bold rounded ${u.status === 'Active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-slate-800 text-slate-400'}">${u.status}</span>
            </td>
            <td class="py-4 px-6 text-right">
                <button onclick="inspectUserModal('${u.userId}')" class="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg text-xs font-bold">
                    Inspect
                </button>
            </td>
        `;
        body.appendChild(tr);
    });
}

function filterAdminTable() {
    const query = document.getElementById('adminSearchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#adminTableBody tr');
    rows.forEach(r => {
        const text = r.textContent.toLowerCase();
        r.style.display = text.includes(query) ? '' : 'none';
    });
}

function addDemoAdminRecords() {
    adminDatabase.push({
        userId: 'jessica_fit', name: 'Jessica Taylor', age: 28, weight: 65, goal: 'Flexibility & Core', intensity: 'Low', status: 'Active'
    });
    renderAdminTable();
    showToast("Demo user record added to table.");
}

function inspectUserModal(userId) {
    const user = adminDatabase.find(u => u.userId === userId);
    if (!user) return;

    document.getElementById('modalName').textContent = `${user.name} (@${user.userId})`;
    document.getElementById('modalMeta').textContent = `Goal: ${user.goal} • Intensity: ${user.intensity} • Age: ${user.age} • Weight: ${user.weight}kg`;

    document.getElementById('modalContent').innerHTML = `
        <div class="space-y-3 text-xs">
            <div class="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                <strong>Status:</strong> Active Plan Assigned • SQLite Database Synced
            </div>
            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span class="font-bold text-white block">Program Highlights:</span>
                <p class="text-slate-400">7-Day structured routine focused on ${user.goal}. Custom warm-ups and progressive intensity volume active.</p>
            </div>
        </div>
    `;

    document.getElementById('detailModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('detailModal').classList.add('hidden');
}

// Toast Helper
function showToast(msg) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = "pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border border-orange-500/50 bg-slate-900 text-white shadow-2xl transition-all duration-300 text-xs font-semibold transform translate-y-2 opacity-0";
    toast.innerHTML = `<i class="fa-solid fa-circle-check text-orange-400"></i> <span>${msg}</span>`;

    container.appendChild(toast);
    setTimeout(() => toast.classList.remove('translate-y-2', 'opacity-0'), 10);
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}