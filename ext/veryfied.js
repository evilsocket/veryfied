console.log('veryfied loaded');
var icon = document.createElement('span');
icon.innerHTML = `<div dir="auto"><svg  style="color: red" viewBox="0 0 24 24" aria-label="Veryfied account" role="img" class="r-13v1u17 r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr"><g><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path></g></svg></div>`;
var icon2 = `<svg  style="color: red" viewBox="0 0 24 24" aria-label="Veryfied account" role="img" class="r-13v1u17 r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr"><g><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path></g></svg>`;
// returns true if the anchor is a profile link by checking its attributes.
function isProfileLink(a) {
	// non profile links have other attributes
	const valid = ['href', 'role', 'class', undefined];
	for (const attr of a.attributes)
	{
		if (typeof (attr) == 'function') continue;
		if (valid.includes(attr.name) == false) return false;
		// status or other type of link
		if (attr.name == 'href' && attr.value.split('/').length != 2) return false;
	}
	return true;
}
// returns true if the user screen name contained in the anchor is in the database.
function isVeryfiedLink(a) {
	var screen_name = a.getAttribute('href').substring(1).toLowerCase();
	return veryfied_users.includes(screen_name);
}
// returns true if the user screen name contained in the div is in the database.
function isVeryfiedDiv(div) {
	for (const span of div.querySelectorAll('span'))
	{
		if (span.textContent.length > 0 && span.textContent[0] == '@')
		{
			var screen_name = span.textContent.substring(1).toLowerCase();
			return veryfied_users.includes(screen_name);
		}
	}
	return false;
}
// returns true if the user screen name contained in the document title is in the database.
function isVeryfiedTitle() {
	var title = document.title;
	var start = title.indexOf('(@');
	var end = title.indexOf(')');
	if (start == -1 || end == -1) return false;
	var screen_name = title.substring(start + 2, end).toLowerCase();
	return veryfied_users.includes(screen_name);
}
// adds the verified svg badge to the html element.
function decorateVeryfied(element) {
	// skip if already decorated
	if (element.hasAttribute('veryfied') || element.querySelectorAll('*[veryfied]').length > 0) return;
	// this will allow us to skip it for the next iteration
	element.setAttribute('veryfied', 'true');
	// locate the child element containing the screen name
	for (const child of element.getElementsByTagName('*'))
	{
		// find the first child containing the display name text
		if (child.childNodes.length == 1 && child.textContent.length > 0)
		{
			// add the icon
			// TODO: use better css to align element especially on profile pages
			child.innerHTML += icon.innerHTML;
			break;
		}
	}
}
// MutationObserver would be a cleaner way to do this, however it doesn't work properly at least on Chrome :(
// I never hated twitter so much in my life, when you start picking apart the html code, you wonder how this tangle mess even runs
window.setInterval(function () {
	// profile links
	for (const a of document.querySelectorAll("a[role='link']")) {
		// skip non profile links
		if (!isProfileLink(a)) continue;
		// add decoration if this profile is in the database
		if (isVeryfiedLink(a)) {
			decorateVeryfied(a);
		}
	}
	// profile page links
	try {
		for (const div of document.querySelectorAll('div[data-testid="UserCell"], div[data-testid="TypeaheadUser"]')) {
		if (isVeryfiedDiv(div)) {
			decorateVeryfied(div);
		}
	}
	} catch (ex) {}
	
	try {
		for (const div of document.querySelectorAll('div[data-testid="conversation"]')){
		var conv_div_4 = div;
		var conv_div_4_1 = conv_div_4.childNodes[0];
		var conv_div_4_1_2 = conv_div_4_1.childNodes[1];
		if (isVeryfiedDiv(conv_div_4_1_2)) {
			decorateVeryfied(conv_div_4_1_2);
		}
	}
	} catch (ex) {}
	try {
		document.querySelector('div[data-testid="UserName"]').id = "UserNameBlock";
		var username_span = document.getElementById('UserNameBlock').getElementsByTagName('span')[0];
	} catch (ex) {}

	for (const div of document.querySelectorAll("div[aria-label='Home timeline']")) {
		try {
			var hometime = div.getElementsByTagName('div');
			var hometime6 = hometime[6];
			var hometime6_2 = hometime6.childNodes[1];
			var hometime6_2_h2 = hometime6_2.getElementsByTagName('h2')[0];
			var hometime6_2_h2_span = hometime6_2_h2.getElementsByTagName('span')[0];
		} catch (ex) {
			break;
		}
		
		if (isVeryfiedTitle() == true) {
			if (hometime6_2_h2_span.innerHTML.includes('id="veryfied_title"') == false)
			{
				hometime6_2_h2_span.innerHTML = '<span id="veryfied_title" dir="auto"></span>';
			} else {
				try {
					document.getElementById('veryfied_title').innerHTML = document.title.replace(
					"/ Twitter", "").replace("(@" + document.title.substring(document.title
					.indexOf('(@') + 2, document.title.indexOf(')')) + ")", "") + icon2;
				username_span.innerHTML = document.title.replace("/ Twitter", "").replace("(@" +
					document.title.substring(document.title.indexOf('(@') + 2, document.title
						.indexOf(')')) + ")", "") + icon2;
				} catch (ex) {
					break;
				}
				
			}
		} else {
			try {
				document.getElementById('veryfied_title').innerHTML = document.title.replace(
					"/ Twitter", "").replace("(@" + document.title.substring(document.title
					.indexOf('(@') + 2, document.title.indexOf(')')) + ")", "");
				username_span.innerHTML = document.title.replace("/ Twitter", "").replace(" (@" +
					document.title.substring(document.title.indexOf('(@') + 2, document.title
						.indexOf(')')) + ")", "");
			} catch (ex) {
				break;
			}
		}
	}
}, 1000);