document.addEventListener('DOMContentLoaded', () => {

    // --- MOCK DATA STORE ---
    const mockData = {
            currentUser: {
            id: 1,
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane.doe@example.com',
            plan: 'Ultra',
            role: 'Owner',
            avatar: 'https://i.pravatar.cc/40?u=jane', // Ensure avatar is here
            // ADD THIS NEW ADDRESS OBJECT
            address: {
                street: '123 Innovation Drive',
                city: 'Muntinlupa',
                state: 'Metro Manila',
                zip: '1770',
                country: 'Philippines'
            }
        },

        // --- ADD THIS NEW ARRAY ---
        notifications: [
            { id: 1, text: 'New sale recorded for Pro Plan Subscription.', timestamp: '10 minutes ago', read: false, link: '#' },
            { id: 2, text: 'Your "Spring \'25" campaign just reached 50k reach!', timestamp: '45 minutes ago', read: false, link: '#' },
            { id: 3, text: 'John Smith completed the task "Audit SEO Performance".', timestamp: '2 hours ago', read: true, link: '#' },
            { id: 4, text: 'A new team member, Maria Garcia, has joined.', timestamp: '1 day ago', read: true, link: '#' }
        ],

        dashboard: {
            totalRevenue: 7590.55,
            totalReach: 124580,
            engagementRate: 2.3,
            totalConversions: 431,
            revenueLast30Days: generateLast30DaysRevenue()
        },
        // UPDATED: Added tasks with start and due dates for the new widget
         tasks: [
            { id: 1, content: 'Finalize Q3 Marketing Budget', status: 'inprogress', assigneeId: 1, priority: 'High', dueDate: '2025-06-20', description: 'Coordinate with department heads to finalize the budget allocations for all Q3 campaigns.', subtasks: [{id: 1, text: 'Get figures from Sales', done: true}, {id: 2, text: 'Get figures from Ops', done: false}], linkedCampaignId: null },
            { id: 2, content: 'Onboard new Marketing Intern', status: 'todo', assigneeId: 4, priority: 'Medium', dueDate: '2025-06-25', description: 'Complete the full onboarding checklist for the new intern, including system access and initial project briefing.', subtasks: [], linkedCampaignId: null },
            { id: 3, content: 'Develop "Summer Sale" campaign assets', status: 'inprogress', assigneeId: 4, priority: 'High', dueDate: '2025-06-25', description: 'Create all visual and text assets for the upcoming Summer Sale campaign.', subtasks: [{id: 1, text: 'Design social media banners', done: true}, {id: 2, text: 'Write ad copy', done: true}, {id: 3, text: 'Produce promo video', done: false}], linkedCampaignId: 2 },
            { id: 4, content: 'Review last week\'s analytics report', status: 'inprogress', assigneeId: 1, priority: 'Low', dueDate: '2025-06-18', description: 'Analyze the weekly performance report and summarize key takeaways for the team meeting.', subtasks: [], linkedCampaignId: null },
            { id: 5, content: 'Publish new blog post: "5 Tips for SaaS Growth"', status: 'done', assigneeId: 4, priority: 'Medium', dueDate: '2025-06-10', description: '', subtasks: [], linkedCampaignId: null },
            { id: 7, content: 'Prepare for Investor Update Meeting', status: 'todo', assigneeId: 1, priority: 'High', dueDate: '2025-06-18', description: 'Compile all necessary documents and slides for the investor update.', subtasks: [], linkedCampaignId: null},
            { id: 8, content: 'Audit SEO Performance', status: 'todo', assigneeId: 2, priority: 'Medium', dueDate: '2025-07-05', description: 'Perform a complete SEO audit covering on-page, off-page, and technical aspects.', subtasks: [], linkedCampaignId: null},
        ],

        // Add this new array inside the mockData object
customerJourneys: [
    {
        customerId: 'CUST-001',
        conversionValue: 199.99,
        conversion: true,
        touchpoints: [
            { platform: 'Instagram', action: 'Ad View', date: '2025-06-01' },
            { platform: 'Google Ads', action: 'Ad Click', date: '2025-06-05' },
            { platform: 'InPulse Website', action: 'Purchase', date: '2025-06-06' }
        ]
    },
    {
        customerId: 'CUST-002',
        conversionValue: 0,
        conversion: false,
        touchpoints: [
            { platform: 'Facebook', action: 'Ad Click', date: '2025-06-02' },
            { platform: 'InPulse Website', action: 'View Product', date: '2025-06-02' }
        ]
    },
    {
        customerId: 'CUST-003',
        conversionValue: 39.00,
        conversion: true,
        touchpoints: [
            { platform: 'InPulse Website', action: 'Purchase', date: '2025-06-10' }
        ]
    },
    // --- NEW DATA ADDED BELOW ---
    {
        customerId: 'CUST-004',
        conversionValue: 299.99,
        conversion: true,
        touchpoints: [
            { platform: 'Facebook', action: 'Ad View', date: '2025-06-03' },
            { platform: 'InPulse Website', action: 'View Product', date: '2025-06-08' },
            { platform: 'Google Ads', action: 'Retargeting Click', date: '2025-06-11' },
            { platform: 'InPulse Website', action: 'Purchase', date: '2025-06-11' }
        ]
    },
    {
        customerId: 'CUST-005',
        conversionValue: 0,
        conversion: false,
        touchpoints: [
            { platform: 'Twitter', action: 'Ad Click', date: '2025-06-12' },
            { platform: 'InPulse Website', action: 'Add to Cart', date: '2025-06-12' }
        ]
    },
    {
        customerId: 'CUST-006',
        conversionValue: 499.00,
        conversion: true,
        touchpoints: [
            { platform: 'LinkedIn', action: 'Post Click', date: '2025-06-07' },
            { platform: 'InPulse Website', action: 'Purchase', date: '2025-06-15' }
        ]
    }
],
        // Inside your mockData object in script.js
        financials: {
            netProfitMargin: 18.5, // in percent
            quickRatio: 1.6,
            burnRate: 12500 // in USD per month
        },

        actionableInsight: {
            text: "Your 'Q2 Promo Code' campaign is underperforming. Its ROAS is only 0.8x.",
                suggestedTask: {
                    content: "Analyze and pause the 'Q2 Promo Code' campaign",
                    assigneeId: 4 // Corresponds to Chen Wang (Marketing)
                }
        }, 

        customerSegment: {
                name: "High-Value Tech Adopters",
                description: "This segment responds well to 'New Feature' announcements and has the highest average order value.",
                size: "15% of new customers"
            },

teamPerformance: {
    completionRate: 82, // in percent
    burnoutRisk: 'Low', // Low, Medium, High
},
        campaigns: [
            // MODIFIED: Made Instagram the clear winner in both sales and ROAS
            { id: 1, name: 'Spring \'25 Collection Launch', platform: 'Instagram', status: 'active', reach: 55000, engagement: 4.1, conversions: 210, clicks: 4800, spend: 2000, sales: 8200 },
            // MODIFIED: Adjusted to be an average performer
            { id: 2, name: 'Q2 Promo Code: "SAVE20"', platform: 'Facebook', status: 'active', reach: 30100, engagement: 1.8, conversions: 98, clicks: 1800, spend: 1200, sales: 3000 },
            // MODIFIED: Made it clearly unprofitable to match the insight
            { id: 3, name: 'New Feature Announcement', platform: 'Twitter', status: 'paused', reach: 15600, engagement: 2.5, conversions: 25, clicks: 950, spend: 800, sales: 600 },
            // MODIFIED: Solid performance, but less efficient than Instagram
            { id: 4, name: 'End-of-Year Clearance', platform: 'Google Ads', status: 'completed', reach: 250000, engagement: 1.2, conversions: 512, clicks: 12500, spend: 2500, sales: 6000 },
        ],


        integrations: {
    // --- Existing platforms ---
            shopify: true,
            facebook: true,
            instagram: false,
            quickbooks: false,
            x_twitter: true,
            tiktok: false,
            linkedin: true,
            woocommerce: false,
            bigcommerce: false,
            magento: false,
            
            // --- Add these new platforms ---
            google_ads: true,  // Let's set this to true
            pinterest: false,
            snapchat: false,
            amazon: true,      // Let's set this to true
            ebay: false,
            etsy: false
        },

        sales: {
            transactions: [
                // Add a 'source' to each transaction
                { productName: 'Pro Plan Subscription', revenue: 29.00, source: 'InPulse Website' },
                { productName: 'Pro+ Plan Subscription', revenue: 39.00, source: 'InPulse Website' },
                { productName: 'Gadget Model A', revenue: 199.99, source: 'Shopify' },
                { productName: 'Ultra Plan Subscription', revenue: 49.00, source: 'InPulse Website' },
                { productName: 'Pro Plan Subscription', revenue: 29.00, source: 'InPulse Website' },
                { productName: 'Gadget Model B', revenue: 299.99, source: 'Shopify' },
                { productName: 'Pro Plan Subscription', revenue: 29.00, source: 'InPulse Website' },
                { productName: 'Pro+ Plan Subscription', revenue: 39.00, source: 'InPulse Website' },
                { productName: 'Gadget Model A', revenue: 199.99, source: 'Shopify' },
            ],
            // Pre-calculated for demo
            get topSelling() { return [{ name: 'Pro Plan Subscription', sales: 250, inventoryLevel: Infinity, salesVelocity: 60, costPerUnit: 10, salePrice: 29 }, 
    { name: 'Pro+ Plan Subscription', sales: 180, inventoryLevel: Infinity, salesVelocity: 45, costPerUnit: 12, salePrice: 39 },
    { name: 'Gadget Model A', sales: 95, inventoryLevel: 200, salesVelocity: 25, costPerUnit: 120, salePrice: 199.99 }
]},
            get lowSelling() { return [{ name: 'Basic Plan (Legacy)', sales: 12, inventoryLevel: Infinity, salesVelocity: 3, costPerUnit: 5, salePrice: 19 }, 
    { name: 'Gadget Model C', sales: 8, inventoryLevel: 50, salesVelocity: 2, costPerUnit: 150, salePrice: 249.99 },
    { name: 'Annual Ultra Plan', sales: 5, inventoryLevel: Infinity, salesVelocity: 1, costPerUnit: 100, salePrice: 499 }
]}
        },
        
        team: [
            { id: 1, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', role: 'Owner', avatar: 'https://i.pravatar.cc/40?u=jane' },
            { id: 2, firstName: 'John', lastName: 'Smith', email: 'john.smith@example.com', role: 'Admin', avatar: 'https://i.pravatar.cc/40?u=john' },
            { id: 3, firstName: 'Maria', lastName: 'Garcia', email: 'maria.g@example.com', role: 'Sales', avatar: 'https://i.pravatar.cc/40?u=maria' },
            { id: 4, firstName: 'Chen', lastName: 'Wang', email: 'chen.w@example.com', role: 'Marketing', avatar: 'https://i.pravatar.cc/40?u=chen' },
        ],
        // MODIFIED: To include file attachments in message data
messages: {
    conversations: [
        { id: 1, participantIds: [2], lastMessage: "Let's sync up about the Q3 numbers tomorrow.", timestamp: "10:42 AM" },
        { id: 2, participantIds: [3, 4], lastMessage: "Great work on the campaign assets!", timestamp: "9:15 AM" },
    ],
    threads: {
        "1": [
            { senderId: 2, type: 'text', content: "Hey Jane, do you have a moment to review the latest sales figures?", timestamp: "10:30 AM" },
            { senderId: 1, type: 'file', fileName: 'Q3-Sales-Report.xlsx', fileSize: '1.2 MB', fileUrl: '#', timestamp: "10:32 AM" },
            { senderId: 2, type: 'text', content: "Thanks! Looks good. Also, here's that other document.", timestamp: "10:34 AM" },
            { senderId: 2, type: 'file', fileName: 'Investor-Deck-Draft.pptx', fileSize: '4.8 MB', fileUrl: '#', timestamp: "10:35 AM" },
            { senderId: 1, type: 'text', content: "Perfect, I'll review this afternoon.", timestamp: "10:36 AM" },
            { senderId: 2, type: 'text', content: "Sure, no problem. Let's sync up about the Q3 numbers tomorrow.", timestamp: "10:42 AM" },
        ],
        "2": [
            { senderId: 3, type: 'text', content: "@Chen, the new ad visuals look fantastic!", timestamp: "9:14 AM" },
            { senderId: 4, type: 'text', content: "Thanks, Maria! Glad you like them. The video is rendering now.", timestamp: "9:15 AM" },
        ]
    }
},
        insightReport: null // Will be populated by the AI engine
    };

    // --- DOM Elements ---
    const pageTitle = document.getElementById('page-title');
    const navLinks = document.querySelectorAll('.nav-link');
    const mainAppContent = document.getElementById('main-app-content');
    const userNameSpan = document.getElementById('user-name-span');
    const mainModal = document.getElementById('main-modal');
    const modalContent = mainModal.querySelector('.modal-content');

    // --- Logout Functionality ---
    const signOutBtn = document.getElementById('sign-out-btn');
    if (signOutBtn) {
        signOutBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent any default button behavior

            // In a real application, you would clear the user's session token here.
            // For example: localStorage.removeItem('authToken');
            
            // Redirect the user to the landing page which contains the login form.
            window.location.href = 'login.html'; 
        });
    }

    // --- MOCK API FETCHER ---
    const mockApiFetch = (data) => {
        return new Promise(resolve => {
            const delay = Math.random() * 400 + 100;
            // Deep copy to prevent original mock data from being changed
            const dataCopy = JSON.parse(JSON.stringify(data));
            setTimeout(() => {
                resolve(dataCopy);
            }, delay);
        });
    };

    // --- MOCK DATA GENERATION ---
    function generateLast30DaysRevenue() {
        const data = [];
        let lastValue = 300;
        for (let i = 29; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            lastValue += (Math.random() * 100 - 45);
            if(lastValue < 100) lastValue = 100;
            data.push({
                date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                revenue: parseFloat(lastValue.toFixed(2))
            });
        }
        return data;
    }

    function renderEditTaskModal(taskId) {
    const task = mockData.tasks.find(t => t.id === taskId);
    if (!task) return;

    const assigneeOptions = mockData.team.map(member => 
        `<option value="${member.id}" ${task.assigneeId === member.id ? 'selected' : ''}>${member.firstName} ${member.lastName}</option>`
    ).join('');

    const priorityOptions = ['Low', 'Medium', 'High'].map(p => 
        `<option value="${p}" ${task.priority === p ? 'selected' : ''}>${p}</option>`
    ).join('');

    modalContent.innerHTML = `
        <div class="modal-header">
            <h3 class="modal-title">Edit Task</h3>
            <button class="modal-close-btn"><i data-lucide="x"></i></button>
        </div>
        <form id="edit-task-form">
            <div class="modal-body">
                <input type="hidden" name="taskId" value="${task.id}">
                <div class="form-group">
                    <label for="task-content">Task</label>
                    <input type="text" id="task-content" name="content" class="form-input" value="${task.content}" required>
                </div>
                <div class="form-group">
                    <label for="task-assignee">Assignee</label>
                    <select id="task-assignee" name="assigneeId" class="form-input">
                        <option value="">Unassigned</option>
                        ${assigneeOptions}
                    </select>
                </div>
                <div class="form-grid">
                    <div class="form-group">
                        <label for="task-due-date">Due Date</label>
                        <div class="date-input-wrapper">
                            <input type="date" id="task-due-date" name="dueDate" class="form-input" value="${task.dueDate || ''}">
                            <label for="task-due-date" class="date-input-icon">
                                <i data-lucide="calendar"></i>
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="task-priority">Priority</label>
                        <select id="task-priority" name="priority" class="form-input">
                            ${priorityOptions}
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea class="form-input" name="description" rows="3">${task.description || ''}</textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary modal-close-btn">Cancel</button>
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>`;
    mainModal.classList.add('active');
    lucide.createIcons();
}

    // NEW: Function to generate data for the sales forecast
function generateSalesForecastData() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const historicalData = [];
    let lastValue = 1200;
    for (let i = 0; i < 7; i++) {
        lastValue += (Math.random() * 400 - 180);
        if (lastValue < 500) lastValue = 500;
        historicalData.push(parseFloat(lastValue.toFixed(2)));
    }

    const forecastStart = historicalData[historicalData.length - 1];
    const forecastedData = [forecastStart]; // Start forecast from last historical point
    let forecastValue = forecastStart;
    for (let i = 0; i < 6; i++) {
         forecastValue += (Math.random() * 300 - 100); // More stable trend
         if(forecastValue < 600) forecastValue = 600;
         forecastedData.push(parseFloat(forecastValue.toFixed(2)));
    }

    return {
        labels: days,
        historical: historicalData,
        forecast: forecastedData
    };
}

// NEW: Function to render the sales forecast chart
function renderSalesForecastChart(data) {
    const ctx = document.getElementById('salesForecastChart')?.getContext('2d');
    if (!ctx) return;

    // We need nulls to create a gap between historical and forecast data
    const historicalDataWithGaps = [...data.historical, ...new Array(data.forecast.length - 1).fill(null)];
    const forecastDataWithGaps = [...new Array(data.historical.length -1).fill(null), ...data.forecast];

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels.map(day => `Last ${day}`).concat(data.labels.map(day => `Next ${day}`)),
            datasets: [{
                label: 'Historical Sales',
                data: historicalDataWithGaps,
                borderColor: '#4f46e5',
                backgroundColor: '#4f46e5',
                tension: 0.3,
                fill: false
            },
            {
                label: 'Forecasted Sales',
                data: forecastDataWithGaps,
                borderColor: '#22c55e',
                backgroundColor: '#22c55e',
                borderDash: [5, 5], // This makes the line dashed
                tension: 0.3,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                tooltip: { mode: 'index', intersect: false }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: { callback: (value) => '$' + value.toLocaleString() }
                }
            }
        }
    });
}

    // --- PAGE ROUTER ---
    function switchPage(pageName) {
        if (pageName === 'InSight') {
            pageTitle.textContent = 'InSight';
        } else {
            pageTitle.textContent = pageName.replace(/([A-Z])/g, ' $1').trim();
        }
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        const activePage = document.getElementById(`page-${pageName}`);
        if (activePage) activePage.classList.add('active');

        navLinks.forEach(link => link.classList.toggle('active', link.dataset.page === pageName));
        
        const renderFunction = pageRenderers[pageName];
        if (renderFunction) renderFunction();
    }

    // --- PAGE RENDERERS ---
    const pageRenderers = {
    'Dashboard': renderDashboard,
    'Campaigns': renderCampaigns,
    'Analytics': renderAnalytics,
    'Sales': renderSales,
    'Products': renderProducts,
    'Journeys': renderJourneys,
    'InSight': renderInSight,
    'Productivity': renderProductivity,
    'Team': renderTeam,
    'Messages': renderMessages,
    'Settings': renderSettings
};

// NEW: Function to render the Smart Products page
async function renderProducts() {
    const page = document.getElementById('page-Products');
    const products = [...mockData.sales.topSelling, ...mockData.sales.lowSelling];

    const productCardsHTML = products.map(product => {
        let alertsHTML = '';
        const profitMargin = (product.salePrice - product.costPerUnit) / product.salePrice * 100;
        
        // AI Alert 1: Low Stock Warning
        if (product.inventoryLevel !== Infinity) {
            const daysOfStock = Math.floor(product.inventoryLevel / (product.salesVelocity / 7)); // Simple weekly velocity
            if (daysOfStock < 30) {
                alertsHTML += `<div class="smart-alert warning">
                                <i data-lucide="battery-warning"></i>
                                <span><strong>Low Stock Alert:</strong> Approximately ${daysOfStock} days of stock remaining. Consider reordering soon.</span>
                               </div>`;
            }
        }

        // AI Alert 2: Profitability Insight
        if (profitMargin < 40) {
            alertsHTML += `<div class="smart-alert info">
                                <i data-lucide="dollar-sign"></i>
                                <span><strong>Profitability Insight:</strong> The profit margin is ${profitMargin.toFixed(1)}%. Consider a pricing review or cost reduction.</span>
                           </div>`;
        }

        return `
            <div class="product-card">
                <h4>${product.name}</h4>
                <div class="product-stats">
                    <div class="product-stat"><span>Inventory</span><strong>${product.inventoryLevel === Infinity ? 'Digital' : product.inventoryLevel.toLocaleString()}</strong></div>
                    <div class="product-stat"><span>Sales (30d)</span><strong>${product.sales}</strong></div>
                    <div class="product-stat"><span>Sales Velocity</span><strong>${product.salesVelocity}/wk</strong></div>
                    <div class="product-stat"><span>Profit Margin</span><strong>${profitMargin.toFixed(1)}%</strong></div>
                </div>
                <div class="product-alerts">${alertsHTML || '<p class="no-alerts">No immediate alerts.</p>'}</div>
            </div>`;
    }).join('');

    page.innerHTML = `
        <div class="page-header-actions">
            <h3>Product Intelligence</h3>
        </div>
        <div class="product-grid">${productCardsHTML}</div>
    `;

    lucide.createIcons();
}

async function renderJourneys() {
    const page = document.getElementById('page-Journeys');
    const journeys = await mockApiFetch(mockData.customerJourneys);

    const totalJourneys = journeys.length;
    const totalConversions = journeys.filter(j => j.conversion).length;
    const conversionRate = totalJourneys > 0 ? (totalConversions / totalJourneys) * 100 : 0;

    const journeyCardsHTML = journeys.map(journey => {
        const touchpointsHTML = journey.touchpoints.map((tp, index) => `
            <div class="touchpoint-item">
                <div class="touchpoint-icon platform-${tp.platform.toLowerCase().replace(/\s+/g, '')}">
                    <i data-lucide="${tp.platform === 'Google Ads' ? 'search' : (tp.platform.includes('Website') ? 'globe' : tp.platform.toLowerCase())}"></i>
                </div>
                <div class="touchpoint-details">
                    <strong>${tp.platform}</strong>
                    <span>${tp.action}</span>
                </div>
            </div>
            ${index < journey.touchpoints.length - 1 ? '<div class="touchpoint-connector"></div>' : ''}
        `).join('');

        return `
            <div class="journey-card ${journey.conversion ? 'converted' : ''}">
                <div class="journey-header">
                    <span>${journey.customerId}</span>
                    <strong class="journey-value">${journey.conversion ? '$' + journey.conversionValue : 'No Conversion'}</strong>
                </div>
                <div class="journey-timeline">${touchpointsHTML}</div>
            </div>`;
    }).join('');

    page.innerHTML = `
        <div class="grid-3-cols">
            <div class="stat-card"><h3 class="stat-title">Journeys Analyzed</h3><p class="stat-value">${totalJourneys}</p></div>
            <div class="stat-card"><h3 class="stat-title">Total Conversions</h3><p class="stat-value">${totalConversions}</p></div>
            <div class="stat-card"><h3 class="stat-title">Conversion Rate</h3><p class="stat-value">${conversionRate.toFixed(1)}%</p></div>
        </div>
        <div class="journeys-container">${journeyCardsHTML}</div>
    `;
    lucide.createIcons();
}
    
    // UPDATED renderDashboard function with colorful logic
// MODIFIED: To sync with Productivity page
async function renderDashboard() {
    const page = document.getElementById('page-Dashboard');
    
    // Fetch all necessary data
    const data = await mockApiFetch(mockData.dashboard);
    const { financials, actionableInsight, customerSegment, teamPerformance } = mockData;
    const todoTasks = mockData.tasks.filter(t => t.status === 'todo');

    // --- HTML for the ORIGINAL four stat cards ---
    const originalStatCardsHTML = `
        <div class="stat-card border-green-500"><h3 class="stat-title">Total Revenue</h3><p class="stat-value">$${data.totalRevenue.toLocaleString()}</p><p class="stat-change text-green-500"><i data-lucide="arrow-up-right"></i> +12.5%</p></div>
        <div class="stat-card border-blue-500"><h3 class="stat-title">Total Reach</h3><p class="stat-value">${data.totalReach.toLocaleString()}</p><p class="stat-change text-green-500"><i data-lucide="arrow-up-right"></i> +8.2%</p></div>
        <div class="stat-card border-purple-500"><h3 class="stat-title">Engagement Rate</h3><p class="stat-value">${data.engagementRate}%</p><p class="stat-change text-red-500"><i data-lucide="arrow-down-right"></i> -0.5%</p></div>
        <div class="stat-card border-yellow-500"><h3 class="stat-title">Total Conversions</h3><p class="stat-value">${data.totalConversions.toLocaleString()}</p><p class="stat-change text-green-500"><i data-lucide="arrow-up-right"></i> +15.1%</p></div>
    `;

    // --- HTML for the four NEW feature widgets ---
    const financialsWidgetHTML = `
        <div class="card stat-card-new" id="financials-widget-sm">
            <h3 class="stat-title"><i data-lucide="banknote"></i> Net Profit Margin</h3>
            <p class="stat-value">${financials.netProfitMargin}%</p>
            <p class="stat-change text-green-500">Healthy</p>
        </div>
    `;
    const teamPerfWidgetHTML = `
        <div class="card stat-card-new" id="team-perf-widget-sm">
            <h3 class="stat-title"><i data-lucide="users"></i> Task Completion</h3>
            <p class="stat-value">${teamPerformance.completionRate}%</p>
            <p class="stat-change text-blue-500">Risk: ${teamPerformance.burnoutRisk}</p>
        </div>
    `;
    const customerSegmentWidgetHTML = `
        <div class="card stat-card-new" id="customer-segment-widget-sm">
            <h3 class="stat-title"><i data-lucide="target"></i> Top Segment</h3>
            <p class="stat-value-small">${customerSegment.name}</p>
            <p class="stat-change text-purple-600">${customerSegment.size}</p>
        </div>
    `;
    const aiTaskWidgetHTML = `
        <div class="card stat-card-new" id="ai-task-widget-sm">
            <h3 class="stat-title"><i data-lucide="lightbulb"></i> AI Insight</h3>
            <p class="ai-insight-text">${actionableInsight.text}</p>
            <button class="btn btn-primary btn-sm" id="generate-task-btn" 
                data-content="${actionableInsight.suggestedTask.content}" 
                data-assignee-id="${actionableInsight.suggestedTask.assigneeId}">
                Create Task
            </button>
        </div>
    `;

    // The rest of the dashboard layout remains untouched
    const deadlineTasks = mockData.tasks.filter(t => t.dueDate && t.status !== 'done');
const deadlinesHTML = deadlineTasks.map(task => {
    const assignee = mockData.team.find(t => t.id === task.assigneeId);
    const priorityClass = `priority-${task.priority?.toLowerCase() || 'low'}`;
    const dueString = new Date(task.dueDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    return `
        <div class="deadline-item ${priorityClass}">
            <div class="deadline-details">
                <h4>${task.content}</h4>
                <p>Due: ${dueString}</p>
            </div>
            ${assignee ? `<img src="${assignee.avatar}" class="assignee-avatar" title="Assigned to ${assignee.firstName}">` : '<div class="assignee-avatar-placeholder"></div>'}
        </div>
    `;
}).join('');

    // Assemble the new dashboard layout
    page.innerHTML = `
        <div class="grid-4-cols">
            ${originalStatCardsHTML}
        </div>
        <div class="grid-4-cols" style="margin-top: 1.5rem;">
            ${financialsWidgetHTML}
            ${teamPerfWidgetHTML}
            ${customerSegmentWidgetHTML}
            ${aiTaskWidgetHTML}
        </div>
        <div class="dashboard-bottom-grid">
            <div class="card">
                <h3 class="card-title"><i data-lucide="line-chart"></i>Revenue vs. Time (Last 30 Days)</h3>
                <div class="chart-container"><canvas id="revenueChart"></canvas></div>
            </div>
            <div class="card">
                <h3 class="card-title">My To-Do List</h3>
                <div class="todo-list-widget">
                    <ul id="dashboard-todo-list">${todoTasks.map(task => `<li class="todo-item" data-task-id="${task.id}"><span>${task.content}</span><button class="todo-action-btn" data-action="done" title="Complete Task"><i data-lucide="check-circle-2" class="icon-xs"></i></button></li>`).join('')}</ul>
                    <form id="dashboard-todo-form" class="todo-form">
                        <input type="text" class="form-input" placeholder="Add a new task..." required>
                        <button type="submit" class="btn btn-primary" style="padding: 0.5rem 0.75rem;">+</button>
                    </form>
                </div>
            </div>
        </div>
        <div class="card deadline-widget">
    <h3 class="card-title"><i data-lucide="calendar-clock"></i>Upcoming Deadlines</h3>
    <div class="deadlines-container">${deadlinesHTML}</div>
        </div>`;
    
    renderRevenueChart(data.revenueLast30Days);
    lucide.createIcons();
}

    function renderRevenueChart(revenueData) {
        const ctx = document.getElementById('revenueChart').getContext('2d');
        const labels = revenueData.map(d => d.date);
        const data = revenueData.map(d => d.revenue);
        const chartTitleEl = document.querySelector('.card-title'); // Get the title element
        const originalTitle = chartTitleEl.innerHTML; // Store original title
    
        // --- Custom Chart.js Plugin ---
        // This plugin draws the vertical line and handles the custom tooltip display.
        const interactiveFocusPlugin = {
            id: 'interactiveFocus',
            afterDraw: (chart) => {
                // Only draw if the tooltip is active (i.e., user is hovering)
                if (chart.tooltip._active && chart.tooltip._active.length) {
                    const activePoint = chart.tooltip._active[0];
                    const ctx = chart.ctx;
                    const x = activePoint.element.x;
                    const topY = chart.scales.y.top;
                    const bottomY = chart.scales.y.bottom;
    
                    // Draw the vertical line
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(x, topY);
                    ctx.lineTo(x, bottomY);
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = '#a5b4fc'; // A soft indigo color for the line
                    ctx.stroke();
                    ctx.restore();
                }
            },
        };
    
        // --- Chart Instance ---
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Revenue',
                    data: data,
                    borderColor: '#6366f1',
                    backgroundColor: (context) => {
                        const chart = context.chart;
                        const { ctx, chartArea } = chart;
                        if (!chartArea) return null;
                        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.3)');
                        gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
                        return gradient;
                    },
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0, // Hide points by default
                    pointHoverRadius: 8,
                    pointHitRadius: 20,
                    pointBackgroundColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointBorderWidth: 2,
                    pointHoverBorderColor: '#6366f1',
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        border: { display: false },
                        grid: {
                            color: '#f3f4f6', // Very light grid lines
                            drawTicks: false,
                        },
                        ticks: {
                            padding: 10,
                            callback: (value) => '$' + value,
                        }
                    },
                    x: {
                        grid: { display: false },
                        ticks: {
                            padding: 10,
                            autoSkip: true,
                            maxTicksLimit: 8, // Avoid overcrowding the x-axis
                        }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        enabled: true, // Disable default tooltip
                        external: (context) => {
                            // Custom external tooltip logic to update the chart header
                            const tooltipModel = context.tooltip;
                            // This part of the code has a potential issue. It assumes the chart title element is always for the revenue chart.
                            // To make this robust, we should target the title within the chart's parent card specifically.
                            const chartCard = context.chart.canvas.closest('.card');
                            const titleEl = chartCard ? chartCard.querySelector('.card-title') : null;

                            // Restore original title if tooltip is hidden
                            if (tooltipModel.opacity === 0) {
                                if (titleEl && titleEl.dataset.originalTitle) {
                                    titleEl.innerHTML = titleEl.dataset.originalTitle;
                                }
                                return;
                            }
                            
                            // Store original title if not already stored
                            if (titleEl && !titleEl.dataset.originalTitle) {
                                titleEl.dataset.originalTitle = titleEl.innerHTML;
                            }
    
                            const activePoint = tooltipModel.dataPoints[0];
                            if (activePoint && titleEl) {
                                const date = activePoint.label;
                                const revenue = activePoint.raw.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
                                // Update the chart's title with live data
                                titleEl.innerHTML = `<i data-lucide="line-chart"></i> Revenue: ${revenue} on ${date}`;
                            }
                        }
                    },
                    // Register our custom plugin
                    interactiveFocus: true,
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                }
            },
            // Pass the custom plugin to the chart
            plugins: [interactiveFocusPlugin]
        });
    }

    // NEW function for the Marketing Funnel Chart
function renderFunnelChart(data) {
    const ctx = document.getElementById('funnelChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Reach', 'Clicks', 'Conversions'],
            datasets: [{
                label: 'Marketing Funnel',
                data: [data.totalReach, data.totalClicks, data.totalConversions],
                backgroundColor: [
                    'rgba(99, 102, 241, 0.7)',
                    'rgba(129, 140, 248, 0.7)',
                    'rgba(165, 180, 252, 0.7)'
                ],
                borderColor: [
                    '#6366f1',
                    '#818cf8',
                    '#a5b4fc'
                ],
                borderWidth: 2,
            }]
        },
        options: {
            indexAxis: 'y', // This makes the bar chart horizontal
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Customer Journey Funnel'
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                       color: '#f3f4f6'
                    }
                },
                y: {
                     grid: {
                       display: false
                    }
                }
            }
        }
    });
}

// NEW function for the Spend vs. Sales Chart
function renderSpendVsSalesChart(data) {
    const ctx = document.getElementById('spendVsSalesChart')?.getContext('2d');
    if (!ctx) return;

    const labels = Object.keys(data);
    const spendData = labels.map(label => data[label].spend);
    const salesData = labels.map(label => data[label].sales);

    // --- MODERN: Create Gradients for the bars ---
    const salesGradient = ctx.createLinearGradient(0, 0, 0, 400);
    salesGradient.addColorStop(0, 'rgba(34, 197, 94, 0.8)'); // Brighter green at top
    salesGradient.addColorStop(1, 'rgba(21, 128, 61, 0.8)');   // Darker green at bottom

    const spendGradient = ctx.createLinearGradient(0, 0, 0, 400);
    spendGradient.addColorStop(0, 'rgba(165, 180, 252, 0.8)'); // Lighter indigo/blue at top
    spendGradient.addColorStop(1, 'rgba(99, 102, 241, 0.8)');    // Darker indigo at bottom

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Total Spend',
                    data: spendData,
                    // --- MODERN: Apply gradient and rounded corners ---
                    backgroundColor: spendGradient,
                    borderColor: '#6366f1',
                    borderRadius: 6, // This makes the bars have rounded tops
                    hoverBackgroundColor: '#6366f1', // Solid color on hover for feedback
                    borderWidth: 0, // No border for a flatter look
                },
                {
                    label: 'Total Sales',
                    data: salesData,
                    // --- MODERN: Apply gradient and rounded corners ---
                    backgroundColor: salesGradient,
                    borderColor: '#16a34a',
                    borderRadius: 6,
                    hoverBackgroundColor: '#16a34a',
                    borderWidth: 0,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 14 // Slightly larger legend text
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Platform Performance (Spend vs. Sales)',
                    font: {
                        size: 18, // Larger title
                        weight: '600'
                    },
                    padding: {
                        bottom: 20
                    }
                },
                // --- MODERN: Custom tooltip ---
                tooltip: {
                    backgroundColor: '#1f2937', // Dark background
                    titleColor: '#ffffff',
                    bodyColor: '#e5e7eb',
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: true,
                    boxPadding: 4
                }
            },
             scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: (value) => '$' + value.toLocaleString()
                    },
                    // --- MODERN: Cleaner grid lines ---
                    grid: {
                       color: '#e5e7eb', // Lighter grid lines
                       drawBorder: false, // Remove the axis border
                    }
                },
                x: {
                     grid: {
                       display: false // No vertical grid lines for a cleaner look
                    }
                }
            }
        }
    });
}

    // Replace the old renderCampaigns with this new version
async function renderCampaigns() {
    const page = document.getElementById('page-Campaigns');
    const campaigns = await mockApiFetch(mockData.campaigns); //

    // --- 1. Calculate High-Level KPIs ---
    const activeCampaigns = campaigns.filter(c => c.status === 'active'); //
    const totalSpend = activeCampaigns.reduce((sum, c) => sum + c.spend, 0);
    const totalReach = activeCampaigns.reduce((sum, c) => sum + c.reach, 0);
    const totalSales = activeCampaigns.reduce((sum, c) => sum + c.sales, 0);
    const overallROAS = totalSpend > 0 ? (totalSales / totalSpend) : 0;

    // --- 2. Build the Campaign Table Rows ---
    const rows = campaigns.map(c => { //
        const roas = c.spend > 0 ? (c.sales / c.spend).toFixed(2) + 'x' : 'N/A';
        const cpc = c.clicks > 0 ? '$' + (c.spend / c.clicks).toFixed(2) : 'N/A';
        return `
            <tr>
                <td>${c.name}</td>
                <td>${c.platform}</td>
                <td><span class="status-chip status-${c.status.toLowerCase()}">${c.status}</span></td>
                <td>${c.reach.toLocaleString()}</td>
                <td>$${c.spend.toLocaleString()}</td>
                <td>${roas}</td>
                <td>${cpc}</td>
            </tr>
        `;
    }).join('');

    // --- 3. Generate AI Recommendations ---
    const recommendations = generateCampaignRecommendations();
    const recommendationsHTML = recommendations.map(rec => {
        return `
            <div class="recommendation-card">
                <div class="recommendation-icon ${rec.type}">
                    <i data-lucide="${rec.icon}"></i>
                </div>
                <div class="recommendation-content">
                    <h4>${rec.title}</h4>
                    <p>${rec.text}</p>
                </div>
            </div>
        `;
    }).join('');

    // --- 4. Assemble the Final HTML ---
    page.innerHTML = `
        <div class="grid-4-cols">
            <div class="stat-card border-blue-500"><h3 class="stat-title">Active Campaigns</h3><p class="stat-value">${activeCampaigns.length}</p></div>
            <div class="stat-card border-yellow-500"><h3 class="stat-title">Total Ad Spend (Active)</h3><p class="stat-value">$${totalSpend.toLocaleString()}</p></div>
            <div class="stat-card border-purple-500"><h3 class="stat-title">Combined Reach (Active)</h3><p class="stat-value">${totalReach.toLocaleString()}</p></div>
            <div class="stat-card border-green-500"><h3 class="stat-title">Overall ROAS (Active)</h3><p class="stat-value">${overallROAS.toFixed(2)}x</p></div>
        </div>

        <div class="card">
            <div class="campaign-header">
                <h3 class="card-title">Campaign Breakdown</h3>
                <div class="header-actions">
                    <span style="color: var(--text-light); font-size: 0.875rem; margin-right: 1rem;">Last synced: Just now</span>
                    <button class="btn btn-secondary" id="sync-data-btn"><i data-lucide="refresh-cw"></i><span>Sync Data</span></button>
                </div>
            </div>
            <div class="table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr><th>Campaign Name</th><th>Platform</th><th>Status</th><th>Reach</th><th>Spend</th><th>ROAS</th><th>CPC</th></tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        </div>

        <div class="card">
            <h3 class="card-title"><i data-lucide="sparkles"></i> AI Recommendations</h3>
            <div class="ai-recommendations-grid">
                ${recommendationsHTML}
            </div>
        </div>
    `;
    lucide.createIcons();
}
    
    // Replace the old renderAnalytics with this new version
async function renderAnalytics(options = {}) {
    const { platformFilter = 'All' } = options;
    const page = document.getElementById('page-Analytics');

    // --- 1. Filter Data Based on Selection ---
    const allCampaigns = await mockApiFetch(mockData.campaigns); //
    const filteredCampaigns = platformFilter === 'All' 
        ? allCampaigns 
        : allCampaigns.filter(c => c.platform === platformFilter);

    // --- 2. Generate Filter Dropdown UI ---
    const platforms = ['All', ...new Set(allCampaigns.map(c => c.platform))];
    const filterHTML = `
        <div class="page-header-actions">
            <label for="platform-filter">Show Data For:</label>
            <select id="platform-filter" class="form-input" data-page="Analytics">
                ${platforms.map(p => `<option value="${p}" ${p === platformFilter ? 'selected' : ''}>${p}</option>`).join('')}
            </select>
        </div>`;

    // Handle case with no data for the filter
    if (filteredCampaigns.length === 0) {
        page.innerHTML = filterHTML + `<div class="placeholder-card" style="margin-top: 1.5rem;"><i data-lucide="frown"></i><h3>No Data Available</h3><p>There is no analytics data for the selected platform.</p></div>`;
        lucide.createIcons();
        return;
    }

    // --- 3. Calculate Data for KPIs and BOTH Charts ---
    const totalSpend = filteredCampaigns.reduce((sum, c) => sum + c.spend, 0);
    const totalSales = filteredCampaigns.reduce((sum, c) => sum + c.sales, 0);
    const totalReach = filteredCampaigns.reduce((sum, c) => sum + c.reach, 0);
    const totalClicks = filteredCampaigns.reduce((sum, c) => sum + c.clicks, 0);
    const totalConversions = filteredCampaigns.reduce((sum, c) => sum + c.conversions, 0);
    const roas = totalSpend > 0 ? (totalSales / totalSpend) : 0;
    const cpc = totalClicks > 0 ? (totalSpend / totalClicks) : 0;
    
    // --- FIX: Calculate platform performance from FILTERED data ---
    const platformPerformance = filteredCampaigns.reduce((acc, c) => {
        if (!acc[c.platform]) {
            acc[c.platform] = { spend: 0, sales: 0 };
        }
        acc[c.platform].spend += c.spend;
        acc[c.platform].sales += c.sales;
        return acc;
    }, {});

    // --- 4. Dynamic KPI Cards ---
    const kpiCardsHTML = (platformFilter === 'All') ? `
        <div class="stat-card border-purple-500"><h3 class="stat-title">Total Reach</h3><p class="stat-value">${totalReach.toLocaleString()}</p></div>
        <div class="stat-card border-blue-500"><h3 class="stat-title">Total Clicks</h3><p class="stat-value">${totalClicks.toLocaleString()}</p></div>
        <div class="stat-card border-yellow-500"><h3 class="stat-title">Total Conversions</h3><p class="stat-value">${totalConversions.toLocaleString()}</p></div>
        <div class="stat-card border-green-500"><h3 class="stat-title">Overall ROAS</h3><p class="stat-value">${roas.toFixed(2)}x</p></div>
    ` : `
        <div class="stat-card border-yellow-500"><h3 class="stat-title">Ad Spend</h3><p class="stat-value">$${totalSpend.toLocaleString()}</p></div>
        <div class="stat-card border-green-500"><h3 class="stat-title">Return on Ad Spend</h3><p class="stat-value">${roas.toFixed(2)}x</p></div>
        <div class="stat-card border-blue-500"><h3 class="stat-title">Cost Per Click (CPC)</h3><p class="stat-value">$${cpc.toFixed(2)}</p></div>
        <div class="stat-card border-purple-500"><h3 class="stat-title">Conversions</h3><p class="stat-value">${totalConversions.toLocaleString()}</p></div>
    `;

    // --- 5. FIX: Dynamically generate AI Insights based on filtered data ---
    const topEngagementCampaign = filteredCampaigns.reduce((prev, current) => (prev.engagement > current.engagement) ? prev : current);
    const worstRoasCampaign = filteredCampaigns.filter(c => c.spend > 0).reduce((prev, current) => ((prev.sales / prev.spend) < (current.sales / current.spend)) ? prev : current);
    
    const insightsHTML = `
        <ul class="insight-list">
            <li class="insight-item">
                <div class="insight-item-icon bg-purple"><i data-lucide="mouse-pointer-click"></i></div>
                <div class="insight-item-content">
                    <h4>Highest Engagement</h4>
                    <p>Your <strong>"${topEngagementCampaign.name}"</strong> campaign is resonating most, achieving a <strong>${topEngagementCampaign.engagement}%</strong> engagement rate.</p>
                </div>
            </li>
            <li class="insight-item">
                <div class="insight-item-icon bg-red"><i data-lucide="alert-triangle"></i></div>
                <div class="insight-item-content">
                    <h4>Needs Attention</h4>
                    <p>The <strong>"${worstRoasCampaign.name}"</strong> campaign has the lowest ROAS. Consider reviewing its performance and budget.</p>
                </div>
            </li>
        </ul>`;

    // --- 6. Assemble Final Page with corrected layout ---
    page.innerHTML = `
        ${filterHTML}
        <div class="grid-4-cols" style="margin-top: 1.5rem;">${kpiCardsHTML}</div>
        <div class="analytics-grid-layout">
            <div class="analytics-main">
                <div class="card">
                    <h3 class="card-title">Customer Journey Funnel</h3>
                    <div class="chart-container" style="height: 350px;"><canvas id="funnelChart"></canvas></div>
                </div>
                <div class="card">
                    <h3 class="card-title">Platform Performance (Spend vs. Sales)</h3>
                    <div class="chart-container" style="height: 350px;"><canvas id="spendVsSalesChart"></canvas></div>
                </div>
            </div>
            <aside class="analytics-sidebar">
                <div class="card">
                    <h3 class="card-title"><i data-lucide="sparkles"></i> AI Insights for ${platformFilter}</h3>
                    ${insightsHTML}
                </div>
            </aside>
        </div>
    `;

    // --- 7. Render Charts and Icons with Filtered Data ---
    renderFunnelChart({ totalReach, totalClicks, totalConversions });
    renderSpendVsSalesChart(platformPerformance); // Call the restored chart function
    lucide.createIcons();
}

    // MODIFIED: renderSales now includes the AI Forecast
async function renderSales(options = {}) {
    const { sourceFilter = 'All' } = options;
    const page = document.getElementById('page-Sales');

    // --- 1. Filter Data Based on Selection ---
    const allTransactions = await mockApiFetch(mockData.sales.transactions);
    const filteredTransactions = sourceFilter === 'All'
        ? allTransactions
        : allTransactions.filter(t => t.source === sourceFilter);

    // --- 2. Generate Filter Dropdown UI ---
    const sources = ['All', ...new Set(allTransactions.map(t => t.source))];
    const filterHTML = `
        <div class="page-header-actions">
            <label for="source-filter">Show Sales From:</label>
            <select id="source-filter" class="form-input" data-page="Sales">
                ${sources.map(s => `<option value="${s}" ${s === sourceFilter ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
        </div>`;

    // Handle case with no data
    if (filteredTransactions.length === 0) {
        page.innerHTML = filterHTML + `<div class="placeholder-card" style="margin-top: 1.5rem;"><i data-lucide="frown"></i><h3>No Data Available</h3><p>There are no sales records for the selected source.</p></div>`;
        lucide.createIcons();
        return;
    }

    // --- 3. Calculate KPIs from Filtered Data ---
    const totalRevenue = filteredTransactions.reduce((sum, item) => sum + item.revenue, 0);
    const totalSales = filteredTransactions.length;
    const averageOrderValue = totalRevenue / totalSales;

    // For this demo, top/low selling are just illustrative
    const { topSelling, lowSelling } = mockData.sales; 

    // --- 4. Assemble Final Page ---
    page.innerHTML = `
        ${filterHTML}
        <div class="grid-3-cols" style="margin-top: 1.5rem;">
            <div class="stat-card text-center"><h3 class="stat-title">Total Revenue</h3><p class="stat-value text-green-500">$${totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2})}</p></div>
            <div class="stat-card text-center"><h3 class="stat-title">Total Sales</h3><p class="stat-value text-blue-500">${totalSales.toLocaleString()}</p></div>
            <div class="stat-card text-center"><h3 class="stat-title">Average Order Value</h3><p class="stat-value text-purple-600">$${averageOrderValue.toFixed(2)}</p></div>
        </div>
        <div class="grid-2-cols">
            <div class="card"><h3 class="card-title"><i data-lucide="trending-up"></i>Top Selling Products</h3><ul class="product-list">${topSelling.map(p => `<li><span>${p.name}</span><strong>${p.sales} units</strong></li>`).join('')}</ul></div>
            <div class="card"><h3 class="card-title"><i data-lucide="trending-down"></i>Low Selling Products</h3><ul class="product-list">${lowSelling.map(p => `<li><span>${p.name}</span><strong>${p.sales} units</strong></li>`).join('')}</ul></div>
        </div>
        <div class="card">
             <h3 class="card-title"><i data-lucide="sparkles"></i> AI Sales Forecast for ${sourceFilter}</h3>
             <div class="chart-container" style="height: 300px;"><canvas id="salesForecastChart"></canvas></div>
        </div>
    `;

    // --- 5. Render Chart and Icons ---
    // The forecast chart will also be based on this filtered context
    const forecastData = generateSalesForecastData(); 
    renderSalesForecastChart(forecastData);
    lucide.createIcons();
}

function generateCampaignRecommendations() {
    const recommendations = [];
    const campaigns = mockData.campaigns;
    const topProduct = mockData.sales.topSelling[0]; //
    const customerSegment = mockData.customerSegment; //

    // Recommendation 1: Find the best performing campaign to scale up
    const activeCampaigns = campaigns.filter(c => c.status === 'active'); //
    if (activeCampaigns.length > 0) {
        const bestCampaign = activeCampaigns.reduce((prev, current) => {
            const prevRoas = (prev.sales / prev.spend) || 0;
            const currentRoas = (current.sales / current.spend) || 0;
            return (prevRoas > currentRoas) ? prev : current;
        });
        const bestRoas = (bestCampaign.sales / bestCampaign.spend).toFixed(2);
        if (bestRoas > 2.5) { // Only recommend if ROAS is strong
            recommendations.push({
                type: 'positive',
                icon: 'trending-up',
                title: 'Scale Up High Performer',
                text: `Your <strong>'${bestCampaign.name}'</strong> campaign has an excellent ${bestRoas}x ROAS. Consider increasing its budget to maximize results.`
            });
        }
    }

    // Recommendation 2: Find the worst performing campaign to pause
    if (activeCampaigns.length > 1) {
        const worstCampaign = activeCampaigns.reduce((prev, current) => {
            const prevRoas = (prev.sales / prev.spend) || 0;
            const currentRoas = (current.sales / current.spend) || 0;
            return (prevRoas < currentRoas) ? prev : current;
        });
        const worstRoas = (worstCampaign.sales / worstCampaign.spend).toFixed(2);
        if (worstRoas < 1.2) { // Only recommend if ROAS is poor
             recommendations.push({
                type: 'warning',
                icon: 'alert-triangle',
                title: 'Review Underperformer',
                text: `The <strong>'${worstCampaign.name}'</strong> campaign's ROAS is low at ${worstRoas}x. Review its targeting or consider pausing it.`
            });
        }
    }
    
    // Recommendation 3: Suggest a campaign for the top-selling product
    const hasTopProductCampaign = campaigns.some(c => c.name.toLowerCase().includes(topProduct.name.toLowerCase())); //
    if (!hasTopProductCampaign) {
        recommendations.push({
            type: 'opportunity',
            icon: 'lightbulb',
            title: 'New Campaign Opportunity',
            text: `Your top product, <strong>'${topProduct.name}'</strong>, doesn't have a dedicated campaign. Launch one to boost its visibility and sales.`
        });
    }

    // Recommendation 4: Suggest targeting a key customer segment
    recommendations.push({
        type: 'opportunity',
        icon: 'target',
        title: 'Focus on Key Segment',
        text: `Target the <strong>'${customerSegment.name}'</strong> segment. This group responds well to 'New Feature' announcements and has the highest AOV.` //
    });

    return recommendations;
}

    // MODIFIED - Immediately generates and displays the report on page load
function renderInSight() {
    const page = document.getElementById('page-InSight');
    page.innerHTML = `
        <div class="insight-container">
            <div class="insight-header">
                <div>
                    <h2 class="insight-title">Intelligence Report</h2>
                    <p class="insight-subtitle">Your AI-powered analysis of all connected data streams.</p>
                </div>
                <button class="btn btn-secondary" id="regenerate-report-btn"><i data-lucide="refresh-cw"></i><span>Re-analyze Data</span></button>
            </div>
            <div id="insight-content">
                <div class="insight-loader-container">
                    <div class="insight-loader">
                        <div class="loader-dot"></div>
                        <div class="loader-dot"></div>
                        <div class="loader-dot"></div>
                    </div>
                    <p>InPulse AI is analyzing your data...</p>
                </div>
            </div>
        </div>
    `;
    lucide.createIcons();

    // Generate and display the report automatically after a short delay
    setTimeout(() => {
        displayInsightReport();
    }, 1500);
}

// REPLACED: This function now renders the new, smarter insights
async function displayInsightReport() {
    const reportArea = document.getElementById('insight-report-area');
    
    // Ensure the report is generated with the new logic
    generateInSightReport();
    const report = mockData.insightReport; //

    if (!report || !report.attributionInsight) { // Check for new insight structure
        reportArea.innerHTML = `<div class="placeholder-card"><i data-lucide="alert-triangle"></i><h3>Could Not Generate Report</h3><p>An unexpected error occurred. Please check the data source and try again.</p></div>`;
        lucide.createIcons();
        return;
    }
    
    reportArea.innerHTML = `
        <div class="insight-report-header">
            <h4>Generated Insights</h4>
            <span>${report.generatedDate}</span>
        </div>
        
        <div class="insight-card">
            <div class="insight-card-header"><div class="insight-card-icon" style="background-color: #cffafe;"><i data-lucide="git-merge" style="color: #0891b2;"></i></div><h3 class="insight-card-title">Cross-Channel Attribution</h3></div>
            <div class="insight-card-body">
                <p>${report.attributionInsight.text}</p>
            </div>
        </div>

        <div class="insight-card">
            <div class="insight-card-header"><div class="insight-card-icon" style="background-color: #e0e7ff;"><i data-lucide="shopping-cart" style="color: #4338ca;"></i></div><h3 class="insight-card-title">Product & Marketing Alignment</h3></div>
            <div class="insight-card-body">
                <p>${report.productMarketingInsight.text}</p>
            </div>
        </div>

        <div class="insight-card high-impact">
            <div class="insight-card-header"><div class="insight-card-icon" style="background-color: #dcfce7;"><i data-lucide="package-search" style="color: #16a34a;"></i></div><h3 class="insight-card-title">Inventory Opportunity</h3></div>
            <div class="insight-card-body">
                <p>${report.inventoryInsight.text}</p>
                <span class="recommendation-title">Recommendation:</span>
                <p class="text-light">Create a 'Clearance Sale' campaign on a high-reach platform like Google Ads to move this stock.</p>
            </div>
        </div>
    `;
    
    // --- Activate the Query Panel ---
    const chatArea = document.getElementById('ai-chat-area');
    const suggestedQuestions = document.getElementById('suggested-questions');
    chatArea.innerHTML = `<div class="ai-chat-log" id="ai-chat-log-area"><div class="ai-chat-message ai-response">Report generated! Ask me a question about these insights.</div></div>`;
    suggestedQuestions.style.display = 'block';

    lucide.createIcons();
}

function initializeCalendarDND() {
    const taskChips = document.querySelectorAll('.calendar-view .task-chip');
    const calendarDays = document.querySelectorAll('.calendar-view .calendar-day');

    taskChips.forEach(chip => {
        chip.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', chip.dataset.taskId);
            setTimeout(() => chip.classList.add('dragging'), 0);
        });

        chip.addEventListener('dragend', () => {
            chip.classList.remove('dragging');
        });
    });

    calendarDays.forEach(day => {
        day.addEventListener('dragover', e => {
            e.preventDefault(); // This is necessary to allow a drop
            day.classList.add('drag-over');
        });

        day.addEventListener('dragleave', () => {
            day.classList.remove('drag-over');
        });

        day.addEventListener('drop', e => {
            e.preventDefault();
            day.classList.remove('drag-over');
            const taskId = parseInt(e.dataTransfer.getData('text/plain'));
            const newDueDate = day.dataset.date;

            // Find the task in the central mockData and update its due date
            const taskToUpdate = mockData.tasks.find(t => t.id === taskId);
            if (taskToUpdate) {
                taskToUpdate.dueDate = newDueDate;

                // For user feedback, you can use a toast/alert
                alert(`Task "${taskToUpdate.content}" has been moved to ${newDueDate}.`);

                // Re-render the calendar view to show the change visually
                // Pass the current filter selection to preserve it
                const currentAssigneeFilter = document.getElementById('assignee-filter')?.value;
                renderProductivity({ view: 'calendar', filters: { assigneeId: currentAssigneeFilter } });
            }
        });
    });
}

    // MODIFIED: To add data-task-id for syncing
async function renderProductivity(options = {}) {
    const { view = 'board', filters = {} } = options;
    const page = document.getElementById('page-Productivity');

    try {
        let tasks = await mockApiFetch(mockData.tasks);

        // --- Apply Filters ---
        if (filters.assigneeId) {
            tasks = tasks.filter(t => t.assigneeId === parseInt(filters.assigneeId));
        }

        // --- Header with Filters and View Switcher ---
        const productivityHeaderHTML = `
            <div class="productivity-header">
                <div class="filter-group">
                    <label for="assignee-filter">Filter by Assignee:</label>
                    <select id="assignee-filter" class="form-input">
                        <option value="">All Members</option>
                        ${mockData.team.map(member => `<option value="${member.id}" ${filters.assigneeId == member.id ? 'selected' : ''}>${member.firstName} ${member.lastName}</option>`).join('')}
                    </select>
                </div>
                <div class="view-switcher">
                    <button class="btn btn-secondary ${view === 'board' ? 'active' : ''}" data-view="board"><i data-lucide="layout-kanban"></i> Board</button>
                    <button class="btn btn-secondary ${view === 'calendar' ? 'active' : ''}" data-view="calendar"><i data-lucide="calendar-days"></i> Calendar</button>
                </div>
            </div>`;

        let viewContentHTML = '';

        // --- Generate HTML based on the selected view ---
        if (view === 'calendar') {
            let calendarHTML = '';
            const calendarDate = new Date('2025-06-01T12:00:00Z');
            const month = calendarDate.getMonth();
            const year = calendarDate.getFullYear();
            const firstDayOfMonth = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const monthName = calendarDate.toLocaleString('default', { month: 'long' });
            
            calendarHTML += `<div class="calendar-container">`;
            calendarHTML += `<div class="calendar-header"><h2>${monthName} ${year}</h2></div>`;
            const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            calendarHTML += `<div class="calendar-grid weekdays">${weekdays.map(day => `<div class="weekday">${day}</div>`).join('')}</div>`;
            calendarHTML += `<div class="calendar-grid days">`;

            for (let i = 0; i < firstDayOfMonth; i++) { calendarHTML += `<div class="calendar-day not-current-month"></div>`; }
            
            for (let day = 1; day <= daysInMonth; day++) {
                const fullDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const currentDate = new Date(year, month, day);
                const today = new Date(); // Use today's actual date
                const isTodayClass = (currentDate.toDateString() === today.toDateString()) ? 'is-today' : '';
                
                const tasksForDay = tasks.filter(task => {
                    if (!task.dueDate) return false;
                    const taskDueDate = new Date(task.dueDate + 'T12:00:00Z');
                    return taskDueDate.getFullYear() === year && taskDueDate.getMonth() === month && taskDueDate.getDate() === day;
                });

                calendarHTML += `<div class="calendar-day ${isTodayClass}" data-date="${fullDateStr}"><div class="day-number">${day}</div><div class="tasks-for-day">`;
                
                tasksForDay.forEach(task => {
                    const assignee = mockData.team.find(t => t.id === task.assigneeId);
                    const priorityClass = task.priority ? `priority-${task.priority.toLowerCase()}` : 'priority-low';
                    calendarHTML += `<div class="task-chip ${priorityClass}" draggable="true" data-task-id="${task.id}" title="${task.content}"><span class="task-chip-content">${task.content}</span>${assignee ? `<img src="${assignee.avatar}" class="task-assignee-avatar" title="Assigned to ${assignee.firstName}">` : ''}</div>`;
                });
                calendarHTML += `</div></div>`;
            }
            calendarHTML += `</div></div>`;
            viewContentHTML = `<div class="calendar-view-wrapper"><div class="calendar-view">${calendarHTML}</div></div>`;

        } else { // Default to 'board' view
            const createCard = task => {
                const assignee = mockData.team.find(t => t.id === task.assigneeId);
                let dueDateHTML = '<span></span>'; // Default to empty span
                
                // --- FIX IS HERE: We only do date logic if task.dueDate exists ---
                if (task.dueDate) {
                    const dueDate = new Date(task.dueDate + 'T12:00:00Z');
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    let dueDateClass = '';
                    
                    // Check if the created date is valid before doing calculations
                    if (!isNaN(dueDate.getTime())) {
                        const dayDiff = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
                        if (dayDiff < 0) dueDateClass = 'overdue';
                        else if (dayDiff <= 3) dueDateClass = 'due-soon';
                        
                        dueDateHTML = `<span class="card-due-date ${dueDateClass}">
                                         <i data-lucide="calendar"></i> 
                                         ${dueDate.toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
                                       </span>`;
                    }
                }
                // --- END OF FIX ---

                const priorityClass = `priority-${task.priority?.toLowerCase() || 'low'}`;
                
                return `<div class="kanban-card" draggable="true" data-task-id="${task.id}">
                            <div class="kanban-card-actions">
                                <button class="btn-icon" data-action="edit-task" title="Edit Task"><i data-lucide="file-pen-line"></i></button>
                                <button class="btn-icon" data-action="delete-task" title="Delete Task"><i data-lucide="trash-2"></i></button>
                            </div>
                            <div class="card-priority ${priorityClass}"></div>
                            <div data-action="open-task-modal">
                                <p class="card-content">${task.content || 'Untitled Task'}</p>
                                <div class="kanban-card-footer">
                                    ${dueDateHTML}
                                    ${assignee ? `<img src="${assignee.avatar}" alt="${assignee.firstName}" class="assignee-avatar" title="${assignee.firstName} ${assignee.lastName}">` : ''}
                                </div>
                            </div>
                        </div>`;
            };
            const todo = tasks.filter(t => t.status === 'todo').map(createCard).join('');
            const inprogress = tasks.filter(t => t.status === 'inprogress').map(createCard).join('');
            const done = tasks.filter(t => t.status === 'done').map(createCard).join('');
            viewContentHTML = `
                <div class="kanban-board">
                    <div class="kanban-column" data-status="todo"><h3>To Do</h3><div class="kanban-cards">${todo}</div></div>
                    <div class="kanban-column" data-status="inprogress"><h3>In Progress</h3><div class="kanban-cards">${inprogress}</div></div>
                    <div class="kanban-column" data-status="done"><h3>Done</h3><div class="kanban-cards">${done}</div></div>
                </div>`;
        }

        page.innerHTML = productivityHeaderHTML + viewContentHTML;
        
        lucide.createIcons();
        
        if (view === 'board') {
            initializeKanbanListeners();
        } else if (view === 'calendar') {
            initializeCalendarDND();
        }

    } catch (error) {
        console.error("Failed to render Productivity page:", error);
        page.innerHTML = `<div class="placeholder-card"><i data-lucide="alert-triangle"></i><h3>Oops! Something went wrong.</h3><p>Could not load the productivity board. Please check the console for errors.</p></div>`;
        lucide.createIcons();
    }
}

function renderTaskDetailModal(taskId) {
    const task = mockData.tasks.find(t => t.id === taskId);
    if (!task) return;

    const assignee = mockData.team.find(t => t.id === task.assigneeId);
    const linkedCampaign = task.linkedCampaignId ? mockData.campaigns.find(c => c.id === task.linkedCampaignId) : null;

    // Safety Check: Ensure subtasks is an array before mapping
    const subtasksHTML = (task.subtasks && task.subtasks.length > 0) ? task.subtasks.map(st => `
        <div class="subtask-item">
            <input type="checkbox" id="subtask-${st.id}" ${st.done ? 'checked' : ''}>
            <label for="subtask-${st.id}">${st.text}</label>
        </div>`).join('') : '';

    modalContent.innerHTML = `
        <div class="modal-header">
            <h3 class="modal-title">${task.content}</h3>
            <button class="modal-close-btn"><i data-lucide="x"></i></button>
        </div>
        <div class="task-modal-body">
            <div class="task-modal-section">
                <h4>Details</h4>
                <div class="details-grid">
                    <span>Assignee</span><strong>${assignee ? assignee.firstName + ' ' + assignee.lastName : 'Unassigned'}</strong>
                    <span>Due Date</span><strong>${task.dueDate ? new Date(task.dueDate+'T12:00:00Z').toDateString() : 'None'}</strong>
                    <span>Priority</span><strong>${task.priority || 'Normal'}</strong>
                </div>
            </div>
            <div class="task-modal-section">
                <h4>Description</h4>
                <p>${task.description || 'No description provided.'}</p>
            </div>
            ${subtasksHTML ? `
            <div class="task-modal-section">
                <h4>Sub-tasks</h4>
                <div class="subtask-list">${subtasksHTML}</div>
            </div>` : ''}
            <div class="task-modal-section">
                <h4>Linked Items</h4>
                ${linkedCampaign ? `<div class="linked-item"><i data-lucide="megaphone"></i><span>${linkedCampaign.name}</span></div>` : '<p>No items linked.</p>'}
            </div>
        </div>
        <div class="task-modal-actions">
            <input type="date" class="hidden-date-input" data-task-id="${task.id}">
            <button class="btn btn-secondary" data-action="extend-task"><i data-lucide="calendar-plus"></i> Extend Due Date</button>
            <button class="btn btn-danger" data-action="delete-task" data-task-id="${task.id}"><i data-lucide="trash-2"></i> Delete Task</button>
        </div>`;
    
    mainModal.classList.add('active');
    lucide.createIcons();
}

function initializeKanbanListeners(){
    document.querySelectorAll('.kanban-card').forEach(card => {
        card.addEventListener('dragstart', e => { 
            e.target.classList.add('dragging'); 
        });
        card.addEventListener('dragend', e => { 
            e.target.classList.remove('dragging'); 
        });
    });

    document.querySelectorAll('.kanban-column').forEach(column => {
        column.addEventListener('dragover', e => {
            e.preventDefault();
            const afterElement = getDragAfterElement(column, e.clientY);
            const draggingCard = document.querySelector('.kanban-card.dragging');
            if (draggingCard) { // Ensure draggingCard exists
                const cardContainer = column.querySelector('.kanban-cards');
                if (afterElement == null) {
                    cardContainer.appendChild(draggingCard);
                } else {
                    cardContainer.insertBefore(draggingCard, afterElement);
                }
            }
        });

        column.addEventListener('drop', e => {
            e.preventDefault();
            const draggingCard = document.querySelector('.kanban-card.dragging');
            if (draggingCard) {
                const taskId = parseInt(draggingCard.dataset.taskId);
                const newStatus = column.dataset.status;

                // Update the central data store
                const taskToUpdate = mockData.tasks.find(t => t.id === taskId);
                if (taskToUpdate) {
                    taskToUpdate.status = newStatus;
                }
                
                if (newStatus === 'done') triggerConfetti();
                draggingCard.classList.remove('dragging');
            }
        });
    });
    
    // This helper function is required by the listener above
    function getDragAfterElement(column, y) {
        const draggableElements = [...column.querySelectorAll('.kanban-card:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
}
    
    async function renderTeam() {
    const page = document.getElementById('page-Team');
    const team = await mockApiFetch(mockData.team);
    // MODIFIED: Added data-attributes to the button
    const memberRows = team.map(member => `
        <tr>
            <td><div class="flex-center" style="gap: 0.75rem;"><img src="${member.avatar}" class="user-avatar-img"><span>${member.firstName} ${member.lastName}</span></div></td>
            <td>${member.email}</td>
            <td><span class="status-chip status-completed" style="background-color: #e0e7ff; color: #4338ca;">${member.role}</span></td>
            <td>
                <button class="btn btn-secondary" style="padding: 0.25rem 0.75rem;" 
                        data-action="assign-task" 
                        data-member-id="${member.id}"
                        data-member-name="${member.firstName} ${member.lastName}">
                    Assign Task
                </button>
            </td>
        </tr>`).join('');
    page.innerHTML = `<div class="card"><div class="campaign-header"><h3 class="card-title">Your Team Members</h3><button class="btn btn-primary" id="invite-member-btn"><i data-lucide="user-plus" class="icon-sm"></i><span>Invite Member</span></button></div><div class="table-wrapper"><table class="data-table"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead><tbody>${memberRows}</tbody></table></div></div>`;
    lucide.createIcons();
}

    async function renderMessages() {
        const page = document.getElementById('page-Messages');
        const { conversations } = await mockApiFetch(mockData.messages);
        const conversationListHTML = conversations.map(convo => {
            const participants = convo.participantIds.map(id => mockData.team.find(t => t.id === id));
            const participantName = participants.map(p => p.firstName).join(', ');
            return `<div class="conversation-item" data-id="${convo.id}"><div class="convo-avatar"><img src="${participants[0].avatar}" alt="${participantName}"></div><div class="convo-details"><div class="convo-header"><span class="convo-name">${participantName}</span><span class="convo-time">${convo.timestamp}</span></div><p class="convo-preview">${convo.lastMessage}</p></div></div>`;
        }).join('');
        page.innerHTML = `<div class="messages-layout"><div class="conversation-list"><div class="messages-header"><h3>Inbox</h3><button class="btn btn-primary"><i data-lucide="plus"></i></button></div><div class="conversation-items">${conversationListHTML}</div></div><div class="message-view"><div class="message-view-placeholder"><i data-lucide="messages-square"></i><p>Select a conversation to start messaging</p></div></div></div>`;
        lucide.createIcons();
    }
    
    async function renderSettings() {
    const page = document.getElementById('page-Settings');
    const user = await mockApiFetch(mockData.currentUser);

    // --- HTML for the main settings layout ---
    page.innerHTML = `
        <div class="settings-layout">
            <nav class="settings-nav">
                <a href="#" class="settings-nav-link active" data-section="profile">Profile</a>
                <a href="#" class="settings-nav-link" data-section="team">Team</a>
                <a href="#" class="settings-nav-link" data-section="integrations">Integrations</a>
                <a href="#" class="settings-nav-link" data-section="billing">Billing</a>
                <a href="#" class="settings-nav-link" data-section="security">Security</a>
            </nav>
            <div class="settings-content" id="settings-content-area">
                </div>
        </div>
    `;

    // --- Helper functions to render content for each section ---
    const renderSectionContent = (section) => {
        const container = document.getElementById('settings-content-area');
        let contentHTML = '';

        switch (section) {
            case 'profile':
    contentHTML = `
        <div class="settings-section">
            <h3>Profile Information</h3>
            <p>Update your personal details and photo here.</p>

            <div class="profile-avatar-wrapper">
                <img src="${user.avatar.replace('40', '150')}" alt="User Avatar" class="profile-avatar-img" id="profile-page-avatar">
                <div>
                    <button class="btn btn-secondary" id="change-picture-btn">Change Picture</button>
                    <p style="color: var(--text-light); font-size: 0.875rem; margin-top: 0.5rem;">Upload a new photo.</p>
                </div>
            </div>

            <div class="form-grid">
                <div class="form-group">
                    <label>First Name</label>
                    <input type="text" class="form-input" value="${user.firstName}">
                </div>
                <div class="form-group">
                    <label>Last Name</label>
                    <input type="text" class="form-input" value="${user.lastName}">
                </div>
            </div>
            <div class="form-group">
                <label>Email Address</label>
                <input type="email" class="form-input" value="${user.email}" disabled>
            </div>
            
            <div class="form-footer">
                <button class="btn btn-primary">Save Changes</button>
            </div>
        </div>`;
    break;
            case 'team':
                const teamRows = mockData.team.map(member => `
                    <tr>
                        <td><div class="flex-center" style="gap: 0.75rem;"><img src="${member.avatar}" class="user-avatar-img"><span>${member.firstName} ${member.lastName}</span></div></td>
                        <td><span class="status-chip status-completed">${member.role}</span></td>
                        <td><button class="btn-icon" title="Remove Member"><i data-lucide="trash-2" class="icon-xs"></i></button></td>
                    </tr>`).join('');
                contentHTML = `
                    <div class="settings-section">
                        <div class="section-header">
                            <div><h3>Team Management</h3><p>Manage your team members and their roles.</p></div>
                            <button class="btn btn-primary" id="invite-member-btn"><i data-lucide="user-plus" class="icon-sm"></i> Invite Member</button>
                        </div>
                        <div class="table-wrapper"><table class="data-table"><thead><tr><th>User</th><th>Role</th><th>Actions</th></tr></thead><tbody>${teamRows}</tbody></table></div>
                    </div>`;
                break;
            case 'integrations':
    const integrations = mockData.integrations;
    contentHTML = `
        <div class="settings-section">
            <h3>Integrations</h3>
            <p>Connect InPulse to your favorite third-party services.</p>
            <div class="integration-list">
                <div class="integration-item">
                    <div class="integration-logo-container">
                        <svg viewBox="0 0 81 94" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M40.3331 0C25.9998 0 16.6665 9.33333 16.6665 23.6667V44.6667H26.3332V24.3333C26.3332 15.6667 31.6665 9.66667 40.3331 9.66667C48.9998 9.66667 54.3331 15.6667 54.3331 24.3333V44.6667H63.9998V23.6667C63.9998 9.33333 54.6665 0 40.3331 0Z" fill="#7AB55C"></path><path d="M68.3335 42H12.3335C10.5002 42 8.9998 43.5 8.9998 45.3333V84.6667C8.9998 89.4167 12.9165 93.3333 17.6665 93.3333H62.9998C67.7498 93.3333 71.6665 89.4167 71.6665 84.6667V45.3333C71.6665 43.5 70.1665 42 68.3335 42ZM40.3332 81.3333C33.6665 81.3333 28.3332 76 28.3332 69.3333C28.3332 62.6667 33.6665 57.3333 40.3332 57.3333C46.9998 57.3333 52.3332 62.6667 52.3332 69.3333C52.3332 76 46.9998 81.3333 40.3332 81.3333Z" fill="#5E8E3E"></path></svg>
                    </div>
                    <div class="integration-details"><h4>Shopify</h4><p>Sync your sales, products, and customer data.</p></div>
                    <button class="btn ${integrations.shopify ? 'btn-danger-outline' : 'btn-secondary'}">${integrations.shopify ? 'Disconnect' : 'Connect'}</button>
                </div>
                  <div class="integration-item">
                    <div class="integration-logo-container">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#96588A"><path d="M3.429 20.357l-.103.01L0 21.821l1.415-3.882.103-.01L5.4 21.82l-1.414-3.882-.103-.01L7.766 21.82l-1.414-3.882-.103-.01 3.882-1.414 1.464 3.882.103.01L12 16.929l1.414 3.882.103.01 3.882 1.414-1.464-3.882-.103-.01L19.714 24l-3.882-1.464-.103.01L16.286 24l-3.882-1.464-.103.01L12.857 24l-3.882-1.464-.103.01L9.429 24l-3.882-1.464-.103.01zM24 6.857L20.12.001H3.88L0 6.857h7.765l-.01.103L3.872 16.28h3.893l.01-.103 4.22-9.323 4.22 9.323.01.103h3.893L16.234 6.96l-.01-.103H24z"/></svg>
                    </div>
                    <div class="integration-details"><h4>WooCommerce</h4><p>Connect your WordPress e-commerce store.</p></div>
                    <button class="btn ${integrations.woocommerce ? 'btn-danger-outline' : 'btn-secondary'}">${integrations.woocommerce ? 'Disconnect' : 'Connect'}</button>
                </div>
                <div class="integration-item">
                    <div class="integration-logo-container">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.65 14.16V10.3h-1.3v3.86c0 .85.69 1.54 1.54 1.54h3.57v-1.3h-3.57c-.13 0-.24-.1-.24-.24z" fill="#1A1A1A"></path><path d="M12.98 16.24a3.26 3.26 0 0 0 2.4-5.63H9.55v6.52h1.3V15.6h1.01c.42.4.92.7 1.46.64zM11.75 12h2.5c.34 0 .66.14.88.38.22.24.35.56.35.89s-.13.65-.35.89a1.2 1.2 0 0 1-.88.38h-2.5v-2.54z" fill="#1A1A1A"></path><path d="M22.46 5.86H1.53A1.53 1.53 0 0 0 0 7.4v9.22a1.53 1.53 0 0 0 1.53 1.53h20.94a1.53 1.53 0 0 0 1.53-1.54V7.4a1.53 1.53 0 0 0-1.53-1.54zM8.24 17.13H4.1V7.7h4.14v9.43z" fill="#1A1A1A"></path></svg>
                    </div>
                    <div class="integration-details"><h4>BigCommerce</h4><p>Sync your store, products, and analytics.</p></div>
                    <button class="btn ${integrations.bigcommerce ? 'btn-danger-outline' : 'btn-secondary'}">${integrations.bigcommerce ? 'Disconnect' : 'Connect'}</button>
                </div>
                <div class="integration-item">
                    <div class="integration-logo-container">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4.6l-8.3 4.8v9.6l8.3 4.8 8.3-4.8v-9.6L12 4.6zm0 1.3l7 4.1v2.9l-7-4-7 4v-2.9l7-4.1zm-7 5.4l7 4v8l-7-4v-8zm14 8v-8l-7 4v8l7-4z" fill="#F46F25"></path></svg>
                    </div>
                    <div class="integration-details"><h4>Adobe Commerce</h4><p>Connect your Magento-based storefront.</p></div>
                    <button class="btn ${integrations.magento ? 'btn-danger-outline' : 'btn-secondary'}">${integrations.magento ? 'Disconnect' : 'Connect'}</button>
                </div>
                <div class="integration-item">
                    <div class="integration-logo-container">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#1877F2"></path><path d="M15.5 12H13.5V17H11V12H9.5V10H11V8.5C11 7.12 11.89 6 13.5 6H15.5V8H14C13.45 8 13 8.45 13 9V10H15.5L15 12H13V12H15.5Z" fill="white"></path></svg>
                    </div>
                    <div class="integration-details"><h4>Facebook</h4><p>Sync your ad campaigns and page analytics.</p></div>
                    <button class="btn ${integrations.facebook ? 'btn-danger-outline' : 'btn-secondary'}">${integrations.facebook ? 'Disconnect' : 'Connect'}</button>
                </div>
                <div class="integration-item">
                    <div class="integration-logo-container">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="instagram-gradient" cx="0.3" cy="1.07" r="1"><stop offset="0" stop-color="#FDF497"></stop><stop offset="0.05" stop-color="#FDF497"></stop><stop offset="0.45" stop-color="#FD5949"></stop><stop offset="0.6" stop-color="#D6249F"></stop><stop offset="0.9" stop-color="#285AEB"></stop></radialGradient></defs><path d="M12 2C8.7 2 8.34 2.02 7.15 2.08C5.96 2.14 5.03 2.53 4.22 3.34C3.41 4.15 3.02 5.08 2.96 6.27C2.9 7.46 2.88 7.82 2.88 11.12C2.88 14.42 2.9 14.78 2.96 15.97C3.02 17.16 3.41 18.09 4.22 18.9C5.03 19.71 5.96 20.1 7.15 20.16C8.34 20.22 8.7 20.24 12 20.24C15.3 20.24 15.66 20.22 16.85 20.16C18.04 20.1 18.97 19.71 19.78 18.9C20.59 18.09 20.98 17.16 21.04 15.97C21.1 14.78 21.12 14.42 21.12 11.12C21.12 7.82 21.1 7.46 21.04 6.27C20.98 5.08 20.59 4.15 19.78 3.34C18.97 2.53 18.04 2.14 16.85 2.08C15.66 2.02 15.3 2 12 2ZM12 4.09C15.22 4.09 15.55 4.1 16.7 4.16C17.71 4.21 18.29 4.42 18.68 4.58C19.16 4.78 19.48 5.1 19.8 5.42C20.12 5.74 20.22 6.06 20.42 6.54C20.58 6.93 20.79 7.51 20.84 8.52C20.9 9.67 20.91 10 20.91 12C20.91 14 20.9 14.33 20.84 15.48C20.79 16.49 20.58 17.07 20.42 17.46C20.22 17.94 19.88 18.28 19.56 18.6C19.24 18.92 18.92 19.02 18.44 19.22C18.05 19.38 17.47 19.59 16.46 19.64C15.31 19.7 15 19.71 12 19.71C9 19.71 8.67 19.7 7.52 19.64C6.51 19.59 5.93 19.38 5.54 19.22C5.06 19.02 4.74 18.68 4.42 18.36C4.1 18.04 4.01 17.72 3.8 17.24C3.64 16.85 3.43 16.27 3.38 15.26C3.32 14.11 3.31 13.78 3.31 12C3.31 10.22 3.32 9.89 3.38 8.74C3.43 7.73 3.64 7.15 3.8 6.76C4 6.28 4.34 5.94 4.66 5.62C4.98 5.3 5.3 5.2 5.78 5C6.17 4.84 6.75 4.63 7.76 4.58C8.91 4.52 9.24 4.51 12 4.51V4.09Z" fill="url(#instagram-gradient)"></path><path d="M12 7.38C9.45 7.38 7.38 9.45 7.38 12C7.38 14.55 9.45 16.62 12 16.62C14.55 16.62 16.62 14.55 16.62 12C16.62 9.45 14.55 7.38 12 7.38ZM12 14.82C10.45 14.82 9.18 13.55 9.18 12C9.18 10.45 10.45 9.18 12 9.18C13.55 9.18 14.82 10.45 14.82 12C14.82 13.55 13.55 14.82 12 14.82Z" fill="url(#instagram-gradient)"></path><path d="M16.95 6.11C16.95 6.6 16.56 6.99 16.07 6.99C15.58 6.99 15.19 6.6 15.19 6.11C15.19 5.62 15.58 5.23 16.07 5.23C16.56 5.23 16.95 5.62 16.95 6.11Z" fill="url(#instagram-gradient)"></path></svg>
                    </div>
                    <div class="integration-details"><h4>Instagram</h4><p>Sync your post performance and audience metrics.</p></div>
                    <button class="btn ${integrations.instagram ? 'btn-danger-outline' : 'btn-secondary'}">${integrations.instagram ? 'Disconnect' : 'Connect'}</button>
                </div>
                <div class="integration-item">
                    <div class="integration-logo-container">
                        <svg viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"></path></svg>
                    </div>
                    <div class="integration-details"><h4>X (Twitter)</h4><p>Sync your posts and ad performance.</p></div>
                    <button class="btn ${integrations.x_twitter ? 'btn-danger-outline' : 'btn-secondary'}">${integrations.x_twitter ? 'Disconnect' : 'Connect'}</button>
                </div>
                <div class="integration-item">
                    <div class="integration-logo-container">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.01-1.58-.01-3.16 0-4.75-.83 0-1.66-.01-2.5 0-.02 1.52-.01 3.05-.01 4.57 0 4.54-2.86 7.7-7.44 7.7-4.31 0-7.52-3.5-7.52-7.82 0-4.14 3.02-7.52 7.02-7.86v3.47c-1.94.36-3.22 2.13-2.75 4.06.46 1.9 2.21 3.23 4.18 3.23.02-3.41.01-6.82.01-10.23Z" fill="#000000"></path></svg>
                    </div>
                    <div class="integration-details"><h4>TikTok</h4><p>Analyze your video content and ad campaigns.</p></div>
                    <button class="btn ${integrations.tiktok ? 'btn-danger-outline' : 'btn-secondary'}">${integrations.tiktok ? 'Disconnect' : 'Connect'}</button>
                </div>
                <div class="integration-item">
                    <div class="integration-logo-container">
                        <svg viewBox="0 0 24 24" fill="#0A66C2" xmlns="http://www.w3.org/2000/svg"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2Z M8 19H5v-9h3z M6.5 8.25A1.75 1.75 0 1 1 8.25 6.5 1.75 1.75 0 0 1 6.5 8.25Z M19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93-.94 0-1.62.68-1.62 1.93V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.38 1.02 3.38 3.96Z"></path></svg>
                    </div>
                    <div class="integration-details"><h4>LinkedIn</h4><p>Track your professional networking and ad reach.</p></div>
                    <button class="btn ${integrations.linkedin ? 'btn-danger-outline' : 'btn-secondary'}">${integrations.linkedin ? 'Disconnect' : 'Connect'}</button>
                </div>
                <div class="integration-item">
                    <div class="integration-logo-container">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.8,11.5c0,1.4,1.1,2.5,2.5,2.5s2.5-1.1,2.5-2.5s-1.1-2.5-2.5-2.5S9.8,10.1,9.8,11.5z" fill="#4285F4"></path><path d="M12.3,4.1C10.9,4.1,9.6,4.7,8.7,5.6l1.3,1.3c0.6-0.6,1.4-0.9,2.3-0.9c1.6,0,2.9,1.2,3.1,2.7h-3.1v1.8h5c0.1-0.3,0.1-0.6,0.1-0.9c0-2.9-2.1-5.1-5.1-5.1z" fill="#4285F4"></path><path d="M5.6,8.7C4.7,9.6,4.1,10.9,4.1,12.3s0.6,2.7,1.6,3.6l1.3-1.3c-0.6-0.6-0.9-1.4-0.9-2.3s0.3-1.7,0.9-2.3L5.6,8.7z" fill="#FBBC05"></path><path d="M18.4,15.9c0.6-0.6,0.9-1.4,0.9-2.3s-0.3-1.7-0.9-2.3l1.3-1.3c0.9,0.9,1.6,2.2,1.6,3.6s-0.6,2.7-1.6,3.6L18.4,15.9z" fill="#EA4335"></path><path d="M15.9,18.4l-1.3-1.3c-0.6,0.6-1.4,0.9-2.3,0.9c-0.8,0-1.6-0.3-2.3-0.9l-1.3,1.3c0.9,0.9,2.2,1.6,3.6,1.6C13.7,19.9,15,19.3,15.9,18.4z" fill="#34A853"></path></svg>
                    </div>
                    <div class="integration-details"><h4>Google Ads</h4><p>Analyze ad spend and campaign performance.</p></div>
                    <button class="btn ${integrations.google_ads ? 'btn-danger-outline' : 'btn-secondary'}">${integrations.google_ads ? 'Disconnect' : 'Connect'}</button>
                </div>
                <div class="integration-item">
                    <div class="integration-logo-container">
                        <svg viewBox="0 0 24 24" fill="#E60023" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.2 15.1c-1-.07-1.4-.6-2-1.4-.5-.8-.8-1.7-.8-2.8 0-2.3 1.5-4.2 3.8-4.2 2 0 3.2 1.2 3.2 2.8 0 1.8-1 3.4-2.6 3.4-.9 0-1.6-.8-1.4-1.7.3-1 1-1.8 1-2.8 0-.9-.4-1.5-1.3-1.5-1.2 0-2.1 1.2-2.1 2.7 0 .8.2 1.3.5 1.7.1.1.1.3 0 .5-.2.4-.4.8-.5 1.2-.1.5-.4 1.7-.4 1.7s-.2.8-1 .7z"></path></svg>
                    </div>
                    <div class="integration-details"><h4>Pinterest</h4><p>Track your pins, audience, and ad campaigns.</p></div>
                    <button class="btn ${integrations.pinterest ? 'btn-danger-outline' : 'btn-secondary'}">${integrations.pinterest ? 'Disconnect' : 'Connect'}</button>
                </div>
                <div class="integration-item">
                    <div class="integration-logo-container">
                        <svg viewBox="0 0 24 24" fill="#FFFC00" xmlns="http://www.w3.org/2000/svg"><path d="M19.4 3.3c-1.2-1.2-2.8-1.8-4.5-1.8-3.5 0-6.4 2.9-6.4 6.4 0 1.2.3 2.3.9 3.3-.1 0-.1 0 0 0L4 17.5c-1 3.5 1.5 6.8 5.1 6.8 3.5 0 6.1-3.2 5.1-6.8l-5.3-6.2c0 0 .1 0 0 0 .6-.9 1.4-1.7 2.4-2.3 1-.6 2.1-.9 3.3-.9 1.7 0 3.2.6 4.4 1.8s1.8 2.8 1.8 4.4c0 .3 0 .5-.1.8h-3.4c.1-.2.1-.5.1-.7 0-.9-.3-1.7-.9-2.3s-1.4-.9-2.3-.9c-.9 0-1.7.3-2.3.9-.6.6-.9 1.4-.9 2.3s.3 1.7.9 2.3c.6.6 1.4.9 2.3.9.2 0 .5 0 .7-.1l3.5 4.1c-1.3.8-2.8 1.2-4.4 1.2-3.5 0-6.4-2.9-6.4-6.4 0-1.3.4-2.6 1.1-3.6l-2.4 2.8s.2.5.5 1 .7.9 1.1 1.3.9.7 1.3 1 1 .5 1.3.5h.3c.5 0 1-.2 1.4-.6l2.3-2.7c-1.4-1.3-2.3-3.1-2.3-5.1 0-3.5 2.9-6.4 6.4-6.4 1.7 0 3.3.6 4.5 1.8z"></path></svg>
                    </div>
                    <div class="integration-details"><h4>Snapchat</h4><p>Connect your Snap Ads and audience data.</p></div>
                    <button class="btn ${integrations.snapchat ? 'btn-danger-outline' : 'btn-secondary'}">${integrations.snapchat ? 'Disconnect' : 'Connect'}</button>
                </div>
                <div class="integration-item">
                    <div class="integration-logo-container">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.8,11.5c-1.9-1.9-4.8-2.6-7.2-2.6c-2.8,0-5.1,0.9-6.8,2.5l1.3,1.3c1.3-1.2,3-1.8,5.5-1.8c1.8,0,3.9,0.5,5.5,2.1l1.4-1.3C14.7,11.6,14.8,11.6,14.8,11.5z M20.3,18.9c-0.2,1-1.3,2.4-3.1,2.4c-1.6,0-2.9-1.1-2.9-2.6c0-1.7,1.4-2.6,3-2.6c0.8,0,1.5,0.2,2.1,0.5l0.9-1.7c-0.8-0.5-1.9-0.8-3.1-0.8c-2.9,0-5,2.1-5,4.6c0,2.5,2,4.4,4.8,4.4c2.8,0,4.7-2,5-4.6H20.3z" fill="#FF9900"></path><path d="M12.4,1.6C5.6,1.6,0,7.1,0,14c0,0.1,0,0.2,0,0.2c0.2-5.9,4.9-10.6,10.8-10.6c5.8,0,10.5,4.6,10.8,10.4h0.1c0,0,0-0.1,0-0.1C22,6.5,17.9,1.6,12.4,1.6z" fill="#232F3E"></path></svg>
                    </div>
                    <div class="integration-details"><h4>Amazon</h4><p>Sync your Seller Central sales and ad data.</p></div>
                    <button class="btn ${integrations.amazon ? 'btn-danger-outline' : 'btn-secondary'}">${integrations.amazon ? 'Disconnect' : 'Connect'}</button>
                </div>
                <div class="integration-item">
                    <div class="integration-logo-container">
                        <svg viewBox="0 0 96 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.1,17.2h-18C3.3,17.2,2.5,16.4,2.5,15.6V8.4c0-0.8,0.8-1.6,1.6-1.6h18c0.8,0,1.6,0.8,1.6,1.6v7.2C23.7,16.4,22.9,17.2,22.1,17.2z M12,12.5c-1.7,0-3.1-1.4-3.1-3.1c0-1.7,1.4-3.1,3.1-3.1s3.1,1.4,3.1,3.1C15.1,11.1,13.7,12.5,12,12.5z" fill="#E53238"></path><path d="M47.7,17.2H29.1c-0.8,0-1.6-0.8-1.6-1.6V8.4c0-0.8,0.8-1.6,1.6-1.6h18.5c0.8,0,1.6,0.8,1.6,1.6v7.2C49.2,16.4,48.5,17.2,47.7,17.2z M38.4,12.5c-1.7,0-3.1-1.4-3.1-3.1c0-1.7,1.4-3.1,3.1-3.1c1.7,0,3.1,1.4,3.1,3.1C41.5,11.1,40.1,12.5,38.4,12.5z" fill="#0064D3"></path><path d="M72.2,17.2H54.9c-0.8,0-1.6-0.8-1.6-1.6V8.4c0-0.8,0.8-1.6,1.6-1.6h17.3c0.8,0,1.6,0.8,1.6,1.6v7.2C73.8,16.4,73,17.2,72.2,17.2z M63.6,12.5c-1.7,0-3.1-1.4-3.1-3.1c0-1.7,1.4-3.1,3.1-3.1c1.7,0,3.1,1.4,3.1,3.1C66.7,11.1,65.3,12.5,63.6,12.5z" fill="#F5AF02"></path><path d="M93.5,17.2H77.1c-0.8,0-1.6-0.8-1.6-1.6V8.4c0-0.8,0.8-1.6,1.6-1.6h16.4c0.8,0,1.6,0.8,1.6,1.6v7.2C95.1,16.4,94.3,17.2,93.5,17.2z M85.3,12.5c-1.7,0-3.1-1.4-3.1-3.1c0-1.7,1.4-3.1,3.1-3.1c1.7,0,3.1,1.4,3.1,3.1C88.4,11.1,87,12.5,85.3,12.5z" fill="#86B817"></path></svg>
                    </div>
                    <div class="integration-details"><h4>eBay</h4><p>Manage listings and track sales performance.</p></div>
                    <button class="btn ${integrations.ebay ? 'btn-danger-outline' : 'btn-secondary'}">${integrations.ebay ? 'Disconnect' : 'Connect'}</button>
                </div>
                <div class="integration-item">
                    <div class="integration-logo-container">
                        <svg viewBox="0 0 24 24" fill="#F1641E" xmlns="http://www.w3.org/2000/svg"><path d="M10.2,13.4H6v-2.8h4.2V8.1H3.5v7.8h6.7C10.2,15.9,10.2,13.4,10.2,13.4z M17.6,8.1h-4.9v2.5h2.1c1.5,0,2.8,1.3,2.8,2.8c0,1.5-1.3,2.8-2.8,2.8h-2.1v2.5h4.9c3.1,0,5.6-2.5,5.6-5.6C23.2,10.6,20.7,8.1,17.6,8.1z"></path></svg>
                    </div>
                    <div class="integration-details"><h4>Etsy</h4><p>Sync your handmade & vintage product listings.</p></div>
                    <button class="btn ${integrations.etsy ? 'btn-danger-outline' : 'btn-secondary'}">${integrations.etsy ? 'Disconnect' : 'Connect'}</button>
                </div>
            </div>
        </div>`;
    break;
            case 'billing':
                contentHTML = `
                    <div class="settings-section">
                        <h3>Billing & Subscription</h3>
                        <p>Manage your current plan and view payment history.</p>
                        <div class="card"><div class="plan-display"><div><span class="plan-name">${user.plan} Plan</span><p>Your plan renews on July 16, 2025.</p></div><button class="btn btn-primary">Manage Subscription</button></div></div>
                    </div>`;
                break;
            case 'security':
    contentHTML = `
       <div class="settings-section">
           <h3>Security</h3>
           <p>Manage your password and account security settings.</p>
           <div class="form-group"><label>Password</label><button class="btn btn-secondary">Change Password</button></div>
           <div class="form-group"><label>Two-Factor Authentication (2FA)</label><p>Enhance your account security with 2FA.</p><button class="btn btn-secondary" disabled>Enable 2FA (Coming Soon)</button></div>
       </div>`;
    break;
        }
        container.innerHTML = contentHTML;
        lucide.createIcons();
    };

    // --- Initial render and event handling for nav ---
    renderSectionContent('profile');
    page.querySelector('.settings-nav').addEventListener('click', e => {
        if (e.target.classList.contains('settings-nav-link')) {
            e.preventDefault();
            page.querySelectorAll('.settings-nav-link').forEach(link => link.classList.remove('active'));
            e.target.classList.add('active');
            renderSectionContent(e.target.dataset.section);
        }
    });
}

// NEW function to show the assign task modal
function showAssignTaskModal(memberId, memberName) {
    // Set a default due date for tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const defaultDueDate = tomorrow.toISOString().split('T')[0];

    modalContent.innerHTML = `
        <div class="modal-header">
            <h3 class="modal-title">Assign Task to ${memberName}</h3>
            <button class="modal-close-btn"><i data-lucide="x"></i></button>
        </div>
        <form id="assign-task-form">
            <input type="hidden" name="assigneeId" value="${memberId}">
            <div class="form-group">
                <label for="task-content">Task</label>
                <input type="text" id="task-content" name="content" class="form-input" placeholder="e.g., Follow up with the new leads" required>
            </div>
            <div class="form-group">
                <label for="task-due-date">Due Date</label>
                <input type="date" id="task-due-date" name="dueDate" class="form-input" value="${defaultDueDate}">
            </div>
            <div class="form-group">
                <label for="task-priority">Priority</label>
                <select id="task-priority" name="priority" class="form-input">
                    <option value="Low">Low</option>
                    <option value="Medium" selected>Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary modal-close-btn">Cancel</button>
                <button type="submit" class="btn btn-primary">Assign Task</button>
            </div>
        </form>`;
    mainModal.classList.add('active');
    lucide.createIcons();
}

// REPLACED: This is the new, upgraded AI engine
function generateInSightReport() {
    // --- Insight 1: Cross-Channel Attribution ---
    const journeys = mockData.customerJourneys; //
    const multiTouchJourneys = journeys.filter(j => j.conversion && j.touchpoints.length > 1);
    let topAwarenessPlatform = 'N/A';
    if (multiTouchJourneys.length > 0) {
        // Find the most common platform that is NOT the last touchpoint
        const awarenessCounts = {};
        multiTouchJourneys.forEach(j => {
            const awarenessTouchpoint = j.touchpoints[0];
            awarenessCounts[awarenessTouchpoint.platform] = (awarenessCounts[awarenessTouchpoint.platform] || 0) + 1;
        });
        // Find the platform with the highest count
        topAwarenessPlatform = Object.keys(awarenessCounts).reduce((a, b) => awarenessCounts[a] > awarenessCounts[b] ? a : b);
    }

    // --- Insight 2: Product & Marketing Alignment ---
    const topProduct = mockData.sales.topSelling.find(p => p.inventoryLevel !== Infinity); //
    const drivingCampaign = mockData.campaigns.find(c => c.name.toLowerCase().includes('spring')); //
    const costPerSale = drivingCampaign && topProduct ? (drivingCampaign.spend / (drivingCampaign.conversions * 0.5)) : 0; // Simplified calculation

    // --- Insight 3: Inventory-Driven Marketing ---
    const slowMovingProduct = mockData.sales.lowSelling.find(p => p.inventoryLevel !== Infinity && p.salesVelocity < 5); //
    
    // This object is now the report, containing deeper insights
    mockData.insightReport = {
        attributionInsight: {
            platform: topAwarenessPlatform,
            text: `While some channels drive direct sales, <strong>${topAwarenessPlatform}</strong> is critical for initial awareness. Many converting customers start their journey here.`
        },
        productMarketingInsight: {
            productName: topProduct.name, //
            campaignName: drivingCampaign.name, //
            cost: costPerSale.toFixed(2),
            text: `The <strong>"${drivingCampaign.name}"</strong> campaign is your most effective channel for selling <strong>"${topProduct.name}"</strong>, with an estimated acquisition cost of $${costPerSale.toFixed(2)} per unit.`
        },
        inventoryInsight: {
            productName: slowMovingProduct.name, //
            inventory: slowMovingProduct.inventoryLevel, //
            text: `You have a high inventory (${slowMovingProduct.inventoryLevel} units) of <strong>"${slowMovingProduct.name}"</strong>, which has a low sales velocity. Consider a clearance campaign.`
        },
        generatedDate: new Date().toLocaleString('en-US', { //
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        })
    };
}


// MODIFIED - Creates a two-column layout for the report and the new AI Query panel.
async function renderInSight() {
    const page = document.getElementById('page-InSight');
    page.innerHTML = `
        <div class="insight-page-grid">
            <div id="insight-report-area">
                 <div class="placeholder-card" style="min-height: 500px;">
                    <i data-lucide="brain-circuit"></i>
                    <h3>Unlock Actionable Insights</h3>
                    <p>Our InSight Engine analyzes your campaign, sales, and productivity data to find hidden patterns and opportunities. Click below to generate your report.</p>
                    <button class="btn btn-primary btn-lg" id="generate-report-btn" style="margin-top: 1rem;">
                        <i data-lucide="sparkles"></i>
                        <span>Generate Report</span>
                    </button>
                </div>
            </div>

            <aside class="insight-query-panel">
                <h3 class="query-panel-title"><i data-lucide="message-square"></i> Ask InSight AI</h3>
                <div id="ai-chat-area">
                     <div class="placeholder-card" style="padding: 2rem;">
                         <i data-lucide="sparkles"></i>
                        <p>After generating a report, ask questions here to dig deeper into the data.</p>
                     </div>
                </div>
                <div class="suggested-questions-container" style="display:none;" id="suggested-questions">
                    <h4>Suggested Questions</h4>
                    <div class="suggested-questions">
                        <button class="suggested-question-btn" data-question="attribution">How do my channels work together?</button>
                        <button class="suggested-question-btn" data-question="product_marketing">Which campaign sells my top product?</button>
                        <button class="suggested-question-btn" data-question="inventory">What should I do about slow-moving stock?</button>
                    </div>
                </div>
            </aside>
        </div>
    `;
    lucide.createIcons();
}

    // --- INTERACTIVITY & EVENT LISTENERS ---
    document.getElementById('sidebar-toggle-btn').addEventListener('click', () => document.getElementById('sidebar').classList.toggle('collapsed'));
    navLinks.forEach(link => link.addEventListener('click', e => { e.preventDefault(); switchPage(link.dataset.page); }));

    // --- CORRECTED MODAL AND GLOBAL CLICK HANDLER ---
document.addEventListener('click', e => {
    // --- Logic for closing any modal ---
    // Closes the modal if the 'x' or a 'Cancel' button is clicked
    if (e.target.closest('.modal-close-btn')) {
        e.preventDefault();
        hideModal();
    }
    // Closes the modal if the dark overlay is clicked
    if (e.target.matches('#main-modal')) {
        hideModal();
    }

    const dateIcon = e.target.closest('.date-input-icon');
    if (dateIcon) {
        // Find the date input field next to the icon and force it to open
        const wrapper = dateIcon.closest('.date-input-wrapper');
        const dateInput = wrapper.querySelector('input[type="date"]');

        // This is the command that forces the calendar to show
        if(dateInput) {
            try {
                dateInput.showPicker();
            } catch (error) {
                console.error("Browser doesn't support .showPicker()", error);
            }
        }
    }
    // --- Other global click actions can be moved here if needed ---
});

    // REVISED AND COMPLETE CLICK LISTENER
mainAppContent.addEventListener('click', e => {
    // --- InSight Page Logic ---
    if (e.target.closest('#generate-report-btn')) {
         const btn = e.target.closest('#generate-report-btn');
         btn.innerHTML = `<div class="loader"></div><span>Analyzing Data...</span>`;
         btn.disabled = true;
         setTimeout(() => { displayInsightReport(); }, 1500);
    }

    // --- Sync Data Button Logic ---
if (e.target.closest('#sync-data-btn')) {
    const btn = e.target.closest('#sync-data-btn');
    
    // 1. Change button to "syncing" state
    btn.disabled = true;
    btn.innerHTML = `<i data-lucide="refresh-cw" class="animate-spin"></i><span>Syncing...</span>`;
    lucide.createIcons(); // Re-render the icon

    // 2. Simulate a network delay
    setTimeout(() => {
        // 3. Modify the underlying mock data
        simulateCampaignDataSync();
        
        // 4. Re-render the entire campaigns page with the new data
        // This will also reset the button to its original state.
        renderCampaigns();
    }, 1500); // 1.5 second delay
}

    const assignTaskBtn = e.target.closest('[data-action="assign-task"]');
if (assignTaskBtn) {
    const memberId = assignTaskBtn.dataset.memberId;
    const memberName = assignTaskBtn.dataset.memberName;
    showAssignTaskModal(memberId, memberName);
}

    if (e.target.id === 'change-picture-btn') {
        // Simulate changing the picture by getting a new random avatar
        const newAvatarId = `user${Date.now()}`; // Creates a unique ID for a new image
        const newAvatarUrl = `https://i.pravatar.cc/150?u=${newAvatarId}`;
        
        // Update the avatar on the settings page
        document.getElementById('profile-page-avatar').src = newAvatarUrl;
        // Update the avatar in the main header
        document.querySelector('.header .user-avatar-img').src = newAvatarUrl.replace('150', '40');
        // Update the mock data so the change persists if you navigate away and back
        mockData.currentUser.avatar = newAvatarUrl;
        
        showToast('Profile picture updated!');
    }

     // This new logic correctly handles all actions on a Kanban card
const productivityCard = e.target.closest('.kanban-card');
if (productivityCard) {
    const taskId = parseInt(productivityCard.dataset.taskId);
    const actionTarget = e.target.closest('[data-action]');

    if (actionTarget) {
        const action = actionTarget.dataset.action;

        if (action === 'edit-task') {
            renderEditTaskModal(taskId);
            return; 
        }

        if (action === 'delete-task') {
            if (confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
                const taskIndex = mockData.tasks.findIndex(t => t.id === taskId);
                if (taskIndex > -1) {
                    mockData.tasks.splice(taskIndex, 1);
                    renderProductivity(); // Re-render to show deletion
                }
            }
            return; 
        }

        if (action === 'open-task-modal') {
            renderTaskDetailModal(taskId);
            return; 
        }
    }
}

// This handles actions inside the modal, which are separate from the card itself
const actionBtnInModal = e.target.closest('.modal-content [data-action]');
if (actionBtnInModal) {
    const action = actionBtnInModal.dataset.action;
    const taskId = parseInt(actionBtnInModal.dataset.taskId);

    if (action === 'delete-task') {
        if (confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
            const taskIndex = mockData.tasks.findIndex(t => t.id === taskId);
            if (taskIndex > -1) {
                mockData.tasks.splice(taskIndex, 1);
                hideModal();
                const activeView = document.querySelector('.view-switcher .btn.active')?.dataset.view || 'board';
                renderProductivity({ view: activeView });
            }
        }
    }

    if (action === 'extend-task') {
        const modal = actionBtnInModal.closest('.modal-content');
        modal.querySelector('.hidden-date-input')?.click();
    }
}

     const viewBtn = e.target.closest('.view-switcher .btn');
    if (viewBtn && !viewBtn.classList.contains('active')) {
        const view = viewBtn.dataset.view;
        // Get the current filter value to preserve it when switching views
        const currentAssigneeFilter = document.getElementById('assignee-filter')?.value;
        renderProductivity({ view: view, filters: { assigneeId: currentAssigneeFilter } });
        return; // Stop further execution to prevent conflicts
    }

    

    if (e.target.id === 'file-input') {
        const file = e.target.files[0];
        if (file) {
            const conversationId = document.querySelector('.message-input-form').dataset.conversationId;
            
            // Simulate adding the file to our mock data
            const newFileMessage = {
                senderId: mockData.currentUser.id,
                type: 'file',
                fileName: file.name,
                fileSize: `${(file.size / 1024).toFixed(1)} KB`,
                fileUrl: '#', // In a real app, this would be a URL from a storage service
                timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            };
            
            mockData.messages.threads[conversationId].push(newFileMessage);
            
            // Re-render the message detail to show the new file
            renderMessageDetail(conversationId);
        }
    }

     if (e.target.closest('#generate-task-btn')) {
        const btn = e.target.closest('#generate-task-btn');
        const { content, assigneeId } = btn.dataset;

        const newTaskId = Date.now();
        const newTask = {
            id: newTaskId,
            content: content,
            status: 'todo',
            assigneeId: parseInt(assigneeId),
            startDate: null, 
            dueDate: null
        };
        mockData.tasks.push(newTask);
        
        // Add to UI immediately and show confirmation
        const todoList = document.getElementById('dashboard-todo-list');
        if (todoList) {
            const li = document.createElement('li');
            li.className = 'todo-item';
            li.dataset.taskId = newTaskId;
            li.innerHTML = `<span>${content}</span>
                            <button class="todo-action-btn" data-action="done" title="Complete Task">
                                <i data-lucide="check-circle-2" class="icon-xs"></i>
                            </button>`;
            todoList.appendChild(li);
            lucide.createIcons();
        }
        
        const assignee = mockData.team.find(t => t.id === parseInt(assigneeId));
        showToast(`Task assigned to ${assignee.firstName}.`);

        btn.textContent = 'Task Created!';
        btn.disabled = true;
        return; 
    }

    // REPLACED: Logic for the new suggested questions
    if (e.target.closest('.suggested-question-btn')) {
        const btn = e.target.closest('.suggested-question-btn');
        const questionType = btn.dataset.question;
        const questionText = btn.textContent;
        const chatLog = document.getElementById('ai-chat-log-area');
        const report = mockData.insightReport; //

        chatLog.innerHTML += `<div class="ai-chat-message user-message">${questionText}</div>`;
        chatLog.scrollTop = chatLog.scrollHeight;

        setTimeout(() => {
            let aiResponseHTML = '';
            if (questionType === 'attribution') {
                aiResponseHTML = `The report shows that <strong>${report.attributionInsight.platform}</strong> plays a key role in starting customer journeys. Even if it doesn't get the final click, it's vital for building awareness that leads to sales on other channels.`;
            } else if (questionType === 'product_marketing') {
                aiResponseHTML = `The <strong>"${report.productMarketingInsight.campaignName}"</strong> campaign is the most effective for selling <strong>"${report.productMarketingInsight.productName}"</strong>. The average ad cost to sell one unit via this campaign is about <strong>$${report.productMarketingInsight.cost}</strong>.`;
            } else if (questionType === 'inventory') {
                aiResponseHTML = `You have a high stock of <strong>"${report.inventoryInsight.productName}"</strong>. I recommend creating a high-visibility campaign, like a '20% Off Flash Sale' on Google Ads or Facebook, to turn that inventory back into cash flow.`;
            }
            
            chatLog.innerHTML += `<div class="ai-chat-message ai-response">${aiResponseHTML}</div>`;
            lucide.createIcons();
            chatLog.scrollTop = chatLog.scrollHeight;
        }, 1000);
    }

    // --- Messages Page Logic ---
    const conversationItem = e.target.closest('.conversation-item');
    if (conversationItem) {
        document.querySelectorAll('.conversation-item').forEach(item => item.classList.remove('active'));
        conversationItem.classList.add('active');
        renderMessageDetail(conversationItem.dataset.id);
    }

    if (e.target.closest('#invite-member-btn')) showInviteModal();
    
    // --- NEW: Tab switching logic ---
    const tabBtn = e.target.closest('.tab-btn');
    if (tabBtn) {
        const tabName = tabBtn.dataset.tab;
        // Update active button
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        tabBtn.classList.add('active');
        // Update active content pane
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.id === `tab-content-${tabName}`);
        });
    }

    // --- NEW: File upload button logic ---
    if (e.target.closest('#upload-file-btn')) {
        document.getElementById('file-input').click(); // Programmatically click the hidden file input
    }

    // --- Modal and Team Page Logic ---
    if (e.target.closest('#invite-member-btn')) {
        showInviteModal();
    }
    if (e.target.closest('.modal-close-btn')) {
        hideModal();
    }

    // --- Dashboard To-Do List "Done" Button Logic (New) ---
    const todoDoneBtn = e.target.closest('.todo-action-btn[data-action="done"]');
    if (todoDoneBtn) {
        const todoItem = todoDoneBtn.closest('.todo-item');
        const taskId = parseInt(todoItem.dataset.taskId);

        // Update the central data store
        const taskToUpdate = mockData.tasks.find(t => t.id === taskId);
        if (taskToUpdate) {
            taskToUpdate.status = 'done';
            console.log(`Task ${taskId} status updated to: done`);
        }

        // Update the UI
        todoItem.classList.add('completed');
        setTimeout(() => todoItem.remove(), 500);
        triggerConfetti();
    }
});

mainAppContent.addEventListener('change', e => {
    // Logic for the productivity page filter
    if (e.target.id === 'assignee-filter') {
        const assigneeId = e.target.value;
        const activeView = document.querySelector('.view-switcher .btn.active')?.dataset.view || 'board';
        renderProductivity({ view: activeView, filters: { assigneeId: assigneeId } });
    }

    if (e.target.matches('#platform-filter')) {
        const platform = e.target.value;
        renderAnalytics({ platformFilter: platform });
    }

    if (e.target.matches('#source-filter')) {
        const source = e.target.value;
        renderSales({ sourceFilter: source });
    }

    // Logic for the messages page file upload
    if (e.target.id === 'file-input') {
        const file = e.target.files[0];
        if (file) {
            const conversationId = document.querySelector('.message-input-form').dataset.conversationId;
            const newFileMessage = {
                senderId: mockData.currentUser.id, type: 'file', fileName: file.name,
                fileSize: `${(file.size / 1024).toFixed(1)} KB`, fileUrl: '#',
                timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            };
            mockData.messages.threads[conversationId].push(newFileMessage);
            renderMessageDetail(conversationId);
        }
    }

    // NEW: Logic for extending a task due date
    if (e.target.classList.contains('hidden-date-input')) {
        const newDueDate = e.target.value;
        const taskId = parseInt(e.target.dataset.taskId);
        const taskToUpdate = mockData.tasks.find(t => t.id === taskId);

        if (taskToUpdate) {
            taskToUpdate.dueDate = newDueDate;
            hideModal();
            showToast('Task due date has been updated!');
            // Re-render the productivity page to show the new date
            const activeView = document.querySelector('.view-switcher .btn.active')?.dataset.view || 'board';
            renderProductivity({ view: activeView });
        }
    }
});

    // REVISED AND COMPLETE SUBMIT LISTENER
document.addEventListener('submit', e => {
    e.preventDefault();

    // --- Dashboard To-Do Form Logic (New) ---
    if (e.target.id === 'dashboard-todo-form') {
        const input = e.target.querySelector('input');
        const content = input.value.trim();
        if (content) {
            const newTaskId = Date.now();
            
            // Add the new task to the central data store
            const newTask = {
                id: newTaskId,
                content: content,
                status: 'todo',
                startDate: null, 
                dueDate: null
            };
            mockData.tasks.push(newTask);
            console.log('New task added to mockData:', newTask);

            // Update the UI immediately for good user experience
            const li = document.createElement('li');
            li.className = 'todo-item';
            li.dataset.taskId = newTaskId;
            li.innerHTML = `<span>${content}</span>
                            <button class="todo-action-btn" data-action="done" title="Complete Task">
                                <i data-lucide="check-circle-2" class="icon-xs"></i>
                            </button>`;
            document.getElementById('dashboard-todo-list').appendChild(li);
            lucide.createIcons();
            input.value = '';
        }
    }

    // Inside document.addEventListener('submit', e => { ... });

if (e.target.id === 'edit-task-form') {
    const formData = new FormData(e.target);
    const updatedData = Object.fromEntries(formData.entries());
    const taskId = parseInt(updatedData.taskId);

    const taskIndex = mockData.tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
        // Update the task in the mockData array
        mockData.tasks[taskIndex] = {
            ...mockData.tasks[taskIndex],
            ...updatedData,
            assigneeId: parseInt(updatedData.assigneeId) || null
        };
    }

    hideModal();
    // Use a simple alert for confirmation
    alert('Task updated successfully!');
    renderProductivity(); // Re-render the page to show changes
}

    // Inside the main submit listener, add this block
if (e.target.id === 'assign-task-form') {
    const formData = new FormData(e.target);
    const taskData = Object.fromEntries(formData.entries());

    // Create a new task object
    const newTask = {
        id: Date.now(), // Unique ID
        content: taskData.content,
        status: 'todo',
        assigneeId: parseInt(taskData.assigneeId),
        priority: taskData.priority,
        dueDate: taskData.dueDate,
        description: '', // Optional fields
        subtasks: [],
        linkedCampaignId: null
    };

    // Add the new task to our central data store
    mockData.tasks.push(newTask);

    hideModal();
    // We don't have a showToast function, so we'll use a simple alert for confirmation
    alert(`Task "${newTask.content}" assigned successfully!`);
}

    // --- Messages Page Form Logic ---
    if (e.target.matches('.message-input-form')) {
        const input = e.target.querySelector('input[type="text"]');
        const content = input.value.trim();
        if (content) {
            const messageArea = document.querySelector('.message-area');
            const newMessageHTML = `<div class="message-bubble-wrapper sent"><div class="message-bubble"><p>${content}</p></div><span class="message-timestamp">Just now</span></div>`;
            messageArea.insertAdjacentHTML('beforeend', newMessageHTML);
            messageArea.scrollTop = messageArea.scrollHeight;
            input.value = '';
        }
    }
});

// NEW: Function to simulate fetching new campaign data
function simulateCampaignDataSync() {
    mockData.campaigns.forEach(campaign => {
        // Don't change completed campaigns
        if (campaign.status === 'completed') return;

        // Randomly adjust metrics by a small percentage (+/- 5%)
        const reachChange = 1 + (Math.random() - 0.5) * 0.1; // Multiplier between 0.95 and 1.05
        const spendChange = 1 + (Math.random() - 0.5) * 0.1;
        const salesChange = 1 + (Math.random() - 0.5) * 0.1;

        campaign.reach = Math.round(campaign.reach * reachChange);
        campaign.spend = parseFloat((campaign.spend * spendChange).toFixed(2));
        campaign.sales = parseFloat((campaign.sales * salesChange).toFixed(2));
    });
}

    // MODIFIED: To render tabs for messages and shared files
function renderMessageDetail(id) {
    const thread = mockData.messages.threads[id];
    if (!thread) return;

    const participants = mockData.messages.conversations.find(c => c.id == id).participantIds;
    const participantName = mockData.team.find(t => t.id === participants[0]).firstName;
    const messageView = document.querySelector('.message-view');

    // Filter for text and file messages
    const textMessages = thread.filter(msg => msg.type === 'text');
    const fileMessages = thread.filter(msg => msg.type === 'file');

    // --- RENDER MESSAGE BUBBLES ---
    const messagesHTML = textMessages.map(msg => {
        const isSent = msg.senderId === mockData.currentUser.id;
        return `<div class="message-bubble-wrapper ${isSent ? 'sent' : 'received'}">
                    <div class="message-bubble"><p>${msg.content}</p></div>
                    <span class="message-timestamp">${msg.timestamp}</span>
                </div>`;
    }).join('');

    // --- RENDER FILE LIST ---
    const filesHTML = fileMessages.length > 0 ? fileMessages.map(msg => `
        <div class="file-item">
            <div class="file-icon"><i data-lucide="file-text"></i></div>
            <div class="file-details">
                <span class="file-name">${msg.fileName}</span>
                <span class="file-size">${msg.fileSize}</span>
            </div>
            <a href="${msg.fileUrl}" download="${msg.fileName}" class="btn-icon" title="Download">
                <i data-lucide="download"></i>
            </a>
        </div>
    `).join('') : `<div class="placeholder-card" style="padding: 4rem; background-color: transparent; border: none;"><i data-lucide="folder-x"></i><p>No files have been shared in this conversation yet.</p></div>`;

    // --- ASSEMBLE FINAL HTML WITH TABS ---
    messageView.innerHTML = `
        <div class="message-view-header">
            <h3>${participantName}</h3>
            <div class="message-view-tabs">
                <button class="tab-btn active" data-tab="messages">
                    <i data-lucide="messages-square"></i> Messages
                </button>
                <button class="tab-btn" data-tab="files">
                    <i data-lucide="paperclip"></i> Files (${fileMessages.length})
                </button>
            </div>
        </div>
        <div class="tab-content-wrapper">
            <div class="message-area tab-content active" id="tab-content-messages">${messagesHTML}</div>
            <div class="files-area tab-content" id="tab-content-files">${filesHTML}</div>
        </div>
        <form class="message-input-form" data-conversation-id="${id}">
            <button type="button" class="btn-icon" id="upload-file-btn" title="Attach File"><i data-lucide="paperclip"></i></button>
            <input type="file" id="file-input" style="display: none;">
            <input type="text" class="form-input" placeholder="Type a message...">
            <button type="submit" class="btn btn-primary"><i data-lucide="send"></i></button>
        </form>`;
        
    lucide.createIcons();
    // Scroll to the bottom of the message area
    const messageArea = document.querySelector('.message-area');
    if (messageArea) messageArea.scrollTop = messageArea.scrollHeight;
}

    // MODIFIED: To update the central mockData on drag-and-drop
function initializeKanbanListeners(){
    document.querySelectorAll('.kanban-card').forEach(card => {
        card.addEventListener('dragstart', e => { 
            e.target.classList.add('dragging'); 
        });
        card.addEventListener('dragend', e => { 
            e.target.classList.remove('dragging'); 
        });
    });

    document.querySelectorAll('.kanban-column').forEach(column => {
        column.addEventListener('dragover', e => {
            e.preventDefault();
            const afterElement = getDragAfterElement(column, e.clientY);
            const draggingCard = document.querySelector('.kanban-card.dragging');
            if (afterElement == null) {
                column.querySelector('.kanban-cards').appendChild(draggingCard);
            } else {
                column.querySelector('.kanban-cards').insertBefore(draggingCard, afterElement);
            }
        });

        // This 'drop' event listener is now smarter
        column.addEventListener('drop', e => {
            e.preventDefault();
            const draggingCard = document.querySelector('.kanban-card.dragging');
            if (draggingCard) {
                const taskId = parseInt(draggingCard.dataset.taskId);
                const newStatus = column.dataset.status;

                // --- KEY SYNC LOGIC ---
                // Find the task in our central data store and update its status
                const taskToUpdate = mockData.tasks.find(t => t.id === taskId);
                if (taskToUpdate) {
                    taskToUpdate.status = newStatus;
                    console.log(`Task ${taskId} status updated to: ${newStatus}`);
                }
                // --- END SYNC LOGIC ---

                if (newStatus === 'done') triggerConfetti();
                draggingCard.classList.remove('dragging');
            }
        });
    });
    
    function getDragAfterElement(column, y) {
        const draggableElements = [...column.querySelectorAll('.kanban-card:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
}

    // This function is now cleaner. The main event listener will handle the close button.
function showInviteModal() {
    modalContent.innerHTML = `<div class="modal-header"><h3 class="modal-title">Invite New Team Member</h3><button class="modal-close-btn"><i data-lucide="x"></i></button></div><form id="invite-form"><div class="form-group"><label>Email Address</label><input type="email" class="form-input" required></div><div class="form-group"><label>Role</label><select class="form-input"><option>Member</option><option>Admin</option><option>Sales</option></select></div><div class="modal-footer"><button type="button" class="btn btn-secondary modal-close-btn">Cancel</button><button type="submit" class="btn btn-primary">Send Invite</button></div></form>`;
    mainModal.classList.add('active');
    lucide.createIcons();
    // The event listener that was previously here has been removed for clarity,
    // as a global listener already handles it.
}
    function hideModal() { mainModal.classList.remove('active'); }

    function triggerConfetti() {
        const container = document.getElementById('confetti-container');
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 90%, 70%)`;
            confetti.style.animation = `fall ${Math.random() * 2 + 3}s linear forwards`;
            container.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
        }
    }

    // --- INITIAL LOAD ---
    userNameSpan.textContent = `${mockData.currentUser.firstName} ${mockData.currentUser.lastName}`;
    switchPage('Dashboard');
    lucide.createIcons();
});