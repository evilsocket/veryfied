console.log('veryfied loaded');

var icon = document.createElement('span');
icon.innerHTML = `
<div dir="auto">
	<svg  style="color: red" viewBox="0 0 24 24" aria-label="Veryfied account" role="img" class="r-13v1u17 r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr">
		<g>
			<path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path>
		</g>
	</svg>
</div>`;

function isProfileLink(a) {
	// non profile links have other attributes
	const valid = ['href', 'role', 'class', undefined];
	for (var i in a.attributes) {
		var attr = a.attributes[i];

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

function isVeryfied(a) {
	var screen_name = a.getAttribute('href').split('/')[1].toLowerCase();
	return veryfied_users.includes(screen_name);
}

function decorateVeryfied(a) {
	// this will allow us to skip it for the next iteration
	a.setAttribute('veryfied', 'true');

	var children = a.getElementsByTagName('*');
	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		// find the first child containing the display name text
		if (child.childNodes.length == 1 && child.textContent.length > 0) {
			// add the icon
			child.innerHTML += icon.innerHTML;
			break;
		}
	}
}

window.setInterval(function () {
	for (const a of document.querySelectorAll("a[role='link']")) {
		// skip non profile links
		if (!isProfileLink(a))
			continue;

		// add decoration if this profile is in the database
		if (isVeryfied(a)) {
			decorateVeryfied(a);
		}
	}
}, 200);