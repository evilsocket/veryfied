console.log('veryfied loaded');

var icon = document.createElement('span');
icon.innerHTML = `
<div dir="auto">
	<svg  style="color: green" viewBox="0 0 24 24" aria-label="Veryfied account" role="img" class="r-13v1u17 r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr">
		<g>
			<path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path>
		</g>
	</svg>
</div>`;

// returns true if the anchor is a profile link by checking its attributes.
function isProfileLink(a) {
	// non profile links have other attributes
	const valid = ['href', 'role', 'class', undefined];
	for (const attr of a.attributes) {
		if (typeof (attr) == 'function')
			continue;

		if (valid.includes(attr.name) == false)
			return false;

		// status or other type of link
		if (attr.name == 'href' && attr.value.split('/').length != 2)
			return false;
	}

	return true;
}

// returns true if the user screen name contained in the anchor is in the database.
function isVeryfiedLink(a) {
	var screen_name = a.getAttribute('href').substring(1).toLowerCase();
	return veryfied_users.has(screen_name);
}

// returns true if the user screen name contained in the div is in the database.
function isVeryfiedDiv(div) {
	for (const span of div.querySelectorAll('span')) {
		if (span.textContent.length > 0 && span.textContent[0] == '@') {
			var screen_name = span.textContent.substring(1).toLowerCase();
			return veryfied_users.has(screen_name);
		}
	}
	return false;
}

// adds the verified svg badge to the html element.
function decorateVeryfied(element) {
	// skip if already decorated
	if (element.hasAttribute('veryfied') || element.querySelectorAll('*[veryfied]').length > 0)
		return;

	// this will allow us to skip it for the next iteration
	element.setAttribute('veryfied', 'true');

	// locate the child element containing the screen name
	for (const child of element.getElementsByTagName('*')) {
		// find the first child containing the display name text
		if (child.childNodes.length == 1 && child.textContent.length > 0) {
			// add the icon
			// TODO: use better css to align element especially on profile pages
			child.innerHTML += icon.innerHTML;
			break;
		}
	}
}

// MutationObserver would be a cleaner way to do this, however it doesn't work properly at least on Chrome :(
window.setInterval(function () {
	// profile links
	for (const a of document.querySelectorAll("a[role='link']")) {
		// skip non profile links
		if (!isProfileLink(a))
			continue;

		// add decoration if this profile is in the database
		if (isVeryfiedLink(a)) {
			decorateVeryfied(a);
		}
	}

	// profile page links
	for (const div of document.querySelectorAll('div[data-testid="UserName"], div[data-testid="UserCell"]')) {
		// add decoration if this profile is in the database
		if (isVeryfiedDiv(div)) {
			decorateVeryfied(div);
		}
	}
}, 200);