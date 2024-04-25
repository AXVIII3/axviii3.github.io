// ------------- VARIABLES ------------- //
let ticking = false;
const isFirefox = (/Firefox/i.test(navigator.userAgent));
const isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
const scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive) 
const slideDurationSetting = 600; //Amount of time for which slide is "locked"
let currentSlideNumber = 0;
const totalSlideNumber = $(".background").length;

// ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
function parallaxScroll(event)
{
	let scrollChangeDelta;
	if (isFirefox)
	{
		//Set delta for Firefox
		scrollChangeDelta = event.detail * (-120);
	}
	else if (isIe)
	{
		//Set delta for IE
		scrollChangeDelta = -event.deltaY;
	}
	else
	{
		//Set delta for all other browsers
		scrollChangeDelta = event.wheelDelta;
	}
	if (event.type === "touchmove")
	{
		scrollChangeDelta = event.touches[0].clientY - startY;
	}
	else if (event.type === "touchend")
	{
		scrollChangeDelta = endY - startY;
	}
	if (ticking != true)
	{
		if (scrollChangeDelta <= -scrollSensitivitySetting)
		{
			//Down scroll
			ticking = true;
			if (currentSlideNumber !== totalSlideNumber - 1)
			{
				currentSlideNumber++;
				nextItem();
			}
			slideDurationTimeout(slideDurationSetting);
		}
		if (scrollChangeDelta >= scrollSensitivitySetting)
		{
			//Up scroll
			ticking = true;
			if (currentSlideNumber !== 0)
			{
				currentSlideNumber--;
			}
			previousItem();
			slideDurationTimeout(slideDurationSetting);
		}
	}
}

let startY, endY;
function touchStart(evt)
{
	startY = evt.touches[0].clientY;
}
function touchEnd(evt)
{
	endY = evt.changedTouches[0].clientY;
	parallaxScroll(evt);
}

// ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
function slideDurationTimeout(slideDuration)
{
	setTimeout(function ()
		{
			ticking = false;
		},
	slideDuration);
}

// ------------- ADD EVENT LISTENER ------------- //
const mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);
window.addEventListener("touchstart", touchStart, false);
window.addEventListener("touchend", touchEnd, false);

// ------------- SLIDE MOTION ------------- //
function nextItem()
{
	const $previousSlide = $(".background").eq(currentSlideNumber - 1);
	$previousSlide.removeClass("up-scroll").addClass("down-scroll");
}
function previousItem()
{
	const $currentSlide = $(".background").eq(currentSlideNumber);
	$currentSlide.removeClass("down-scroll").addClass("up-scroll");
}
