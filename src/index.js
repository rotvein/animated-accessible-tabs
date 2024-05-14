import './style/style.scss';


const tabsContainer = document.querySelector('.tabs');
const tabsNav = tabsContainer.querySelector('.tabs__scroller');
const tabs = Array.from(tabsNav.querySelectorAll('.tabs__tab'));
const panelsContainer = tabsContainer.querySelector('.tabs__panels');
const panels = Array.from(panelsContainer.querySelectorAll('.tabs__panel'));
const scroller = document.querySelector('.tabs__scroller');

const arrowLeft = tabsContainer.querySelector('.tabs__arrow-left');
const arrowRight = tabsContainer.querySelector('.tabs__arrow-right');



tabsNav.setAttribute('role', 'tabList');

tabs.forEach((tab, index) => {
	if (index == 0) {
		tab.setAttribute('aria-selected', true)
	} else {
		tab.setAttribute('aria-selected', false);
		tab.setAttribute('aria-controls', `tab-panel-${index + 1}`);
		tab.setAttribute('tabindex', '0');
	
		panels[index].setAttribute('hidden', '');
	}

	tab.setAttribute('role', 'tab');

	panels[index].setAttribute('role', 'tabpanel');	
})

function autoResize() {
	tabsNav.style.setProperty("--_transition-duration", "0");
	const tab = tabsNav.querySelector('[aria-selected="true"]');

	const tabWidth = tab.offsetWidth;
	const navWidth = tabsNav.offsetWidth;	
	const tabLeft = tab.offsetLeft;

	tabsNav.style.setProperty("--_underline-width", tabWidth/ navWidth);
	tabsNav.style.setProperty("--_transition-duration", "200ms");
	tabsNav.style.setProperty("--_underline-left", `${tabLeft}px`);
	
	console.log(scroller.scrollWidth);
	console.log(scroller.clientWidth)
	arrowLeft.classList.toggle('hidden', scroller.scrollWidth >= scroller.clientWidth)
	arrowRight.classList.toggle('hidden', scroller.scrollWidth >= scroller.clientWidth)		
	toggleArrowVisibility()
}

autoResize();

const widthObserver = new ResizeObserver((entries, observer) => {
	for (let entry of entries) {
		autoResize();
	}
})

widthObserver.observe(tabsNav);

tabsContainer.addEventListener('click', (e) => {
	const clickedTab = e.target.closest('button');
	if (!clickedTab) return;
	e.preventDefault();

	switchTab(clickedTab);
})

function switchTab(newTab) {
	const activeTab = tabsNav.querySelector('[aria-selected="true"]');
	
	if (activeTab === newTab) return;
	
	const activeTabIndex = tabs.indexOf(activeTab);
	const activePanel = panels[activeTabIndex];	
	const newTabIndex = tabs.indexOf(newTab);
	const newPanel = panels[newTabIndex];

	activeTab.setAttribute('aria-selected', 'false');
	newTab.setAttribute('aria-selected', 'true');

	activePanel.setAttribute('hidden', '');
	newPanel.removeAttribute('hidden');

	moveUnderline(activeTab, newTab)
}


function moveUnderline(oldTab, newTab) {
	const newTabPosition = oldTab.compareDocumentPosition(newTab);	

	let underlineWidth;
	let underlineLeft; 
	let duration;

	switch (newTabPosition) {
		case 2:  {
			underlineLeft = newTab.offsetLeft;
			underlineWidth = oldTab.offsetLeft + oldTab.offsetWidth - newTab.offsetLeft;				
			if (underlineWidth > 330) {
				duration = 330;
			} else if (underlineWidth < 150) {
				duration = 150
			} else {
				duration = underlineWidth
			}
			tabsNav.style.setProperty('--_transition-duration', `${duration}ms`);
			tabsNav.style.setProperty('--_underline-left', `${underlineLeft}px`);
			tabsNav.style.setProperty('--_underline-width', underlineWidth / tabsNav.offsetWidth);

			break;
		}		

		case 4: {			
			underlineWidth = newTab.offsetLeft + newTab.offsetWidth - oldTab.offsetLeft;	
			if (underlineWidth > 300) {
				duration = 300;
			} else if (underlineWidth < 100) {
				duration = 100
			} else {
				duration = underlineWidth
			}	
			tabsNav.style.setProperty('--_transition-duration', `${duration}ms`);	
			tabsNav.style.setProperty('--_underline-width', underlineWidth / tabsNav.offsetWidth)
			break;
		};		
	}

	setTimeout(() => {		
		tabsNav.style.setProperty('--_underline-left',  `${newTab.offsetLeft}px`);
		tabsNav.style.setProperty("--_underline-width", newTab.offsetWidth/tabsNav.offsetWidth);
	}, duration + 5);
	//
	
	scrollTabs(newTab);
}

function scrollTabs(newTab) {
	const right = scroller.offsetLeft + newTab.offsetLeft + newTab.offsetWidth;
	const left = newTab.offsetLeft;

	const scrollerRight = scroller.offsetLeft + scroller.offsetWidth;
	const scrollerLeft = scroller.offsetLeft;

	if (right > scrollerRight + scroller.scrollLeft - 32) {		
		scroller.scrollLeft = right - scrollerRight + 128;
	}

	if (left < scrollerLeft + scroller.scrollLeft) {
		scroller.scrollLeft = left - scrollerLeft - 128
	}
}


scroller.addEventListener('keydown', e => {
	if (e.key == "ArrowLeft" || e.key == "ArrowRight") e.preventDefault();

	if (e.key === 'Tab') {		
		setTimeout(() => {
			scrollTabs(document.activeElement)
		}, 5);
	}
})


scroller.addEventListener('scroll', e => {
	toggleArrowVisibility(e.target)
})

function toggleArrowVisibility() {		
	arrowLeft.classList.toggle('hidden', scroller.scrollLeft <= 3);
	arrowRight.classList.toggle('hidden', scroller.scrollWidth - scroller.clientWidth - scroller.scrollLeft <= 3);
}


arrowLeft.addEventListener('click', e=> {
	scroller.scrollLeft -= 128;
})
arrowRight.addEventListener('click', e=> {
	scroller.scrollLeft += 128;
})


