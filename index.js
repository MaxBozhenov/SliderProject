function changeSliderActiveItem(projectNodes, sliderArrObjs, index) {
    const currentSlideObj = sliderArrObjs[index];

    projectNodes.cityNode.innerText = currentSlideObj.city;
    projectNodes.repairTimeNode.innerText = currentSlideObj.repairTime;
    projectNodes.apartamentAreaNode.innerText = currentSlideObj.apartamentArea;
    projectNodes.imageNode.src = currentSlideObj.imgSrc;

    addActiveClassToNodes(projectNodes.navLinkNodes, index, 'promo-section__right-side__navbar__link_is-active');
    addActiveClassToNodes(projectNodes.paginationCircleNodes, index, 'promo-section__left-side__pagination__page_is-active');

    promoSectionNode.setAttribute('data-active-index', index);
    // console.log(currentSlideObj.apartamentArea);

}

function initAddEventListeners(projectNodes, sliderArrObjs) {
    
    const clickHandler = (event) => {
        event.preventDefault();
        
        const targetNode = event.target;
        const id = Number(targetNode.getAttribute('data-project-id-link'));

        changeSliderActiveItem(projectNodes, sliderArrObjs, id);
    };

    for (const navLinkNode of projectNodes.navLinkNodes) {
        navLinkNode.addEventListener('click', clickHandler);
    }

    for (const paginationCircleNode of projectNodes.paginationCircleNodes) {
        paginationCircleNode.addEventListener('click', clickHandler);
    }

    const changeDirection = (projectNodes, sliderArrObjs, dir) => {
        const currentIndex = Number(projectNodes.promoSectionNode.getAttribute('data-active-index'));
        const length = sliderArrObjs.length;
        const nextIndex = (currentIndex + length + dir) % length;

        changeSliderActiveItem(projectNodes, sliderArrObjs, nextIndex);
    };

    const clickHandlerLeftBtn = (event) => {
        changeDirection(projectNodes, sliderArrObjs, -1);
    };
    const clickHandlerRightBtn = (event) => {
        changeDirection(projectNodes, sliderArrObjs, 1);
    };

    projectNodes.leftButtonNode.addEventListener('click', clickHandlerLeftBtn);
    projectNodes.rightButtonNode.addEventListener('click', clickHandlerRightBtn);

}

function addActiveClassToNodes(nodes, indexActive, activeClass) {
    
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].classList.contains(activeClass)) {
            nodes[i].classList.remove(activeClass);
        }
        if (i === indexActive) {
            nodes[i].classList.add(activeClass);
        }
    }

}

function getProjectNodes(promoSectionNode) {
    return {
        promoSectionNode: promoSectionNode,
        cityNode: promoSectionNode.querySelector('[data-project-option=city]'),
        repairTimeNode: promoSectionNode.querySelector('[data-project-option=repair-time]'),
        apartamentAreaNode: promoSectionNode.querySelector('[data-project-option=apartament-area]'),
        navLinkNodes: promoSectionNode.querySelectorAll('.promo-section__right-side__navbar__link'),
        leftButtonNode: promoSectionNode.querySelector('.promo-section__left-side__pagination__left-button'),
        rightButtonNode: promoSectionNode.querySelector('.promo-section__left-side__pagination__right-button'),
        paginationCircleNodes: promoSectionNode.querySelectorAll('.promo-section__left-side__pagination__page'),
        imageNode: promoSectionNode.querySelector('.promo-section__right-side__image')
    };
}

const sliderArrObjs = [
    {
        id: 0,
        city: 'Rostov-on-Don LCD admiral',
        repairTime: '3.5 months',
        apartamentArea: '81 m2',
        imgSrc: './img/photo1.png'
    },
    {
        id: 1,
        city: 'Sochi',
        repairTime: '4.5 months',
        apartamentArea: '91 m2',
        imgSrc: './img/photo2.png'
    },
    {
        id: 2,
        city: 'Piter',
        repairTime: '5.5 months',
        apartamentArea: '101 m2',
        imgSrc: './img/photo3.png'
    }
];
const promoSectionNode = document.querySelector('.promo-section');
const projectNodes = getProjectNodes(promoSectionNode);

initAddEventListeners(projectNodes, sliderArrObjs);
// changeSliderActiveItem(projectNodes, sliderArrObjs, 0);


