export function htmlToElement(html: string): HTMLElement {
	const template = document.createElement('template');
	html = html.trim(); // Never return a text node of whitespace as the result
	template.innerHTML = html;
	const child = template.content.firstChild;
	if (!(child instanceof HTMLElement)) throw new Error('Error');
	return child;
}

export const BlockedPostInfo = (props: { postDate: string }) => {
	const html = `
        <td class="post_info" data-v-app="">
			<div class="post_info_content">
				<div class="post_anchor" id="p24392632"></div>
				<div class="avatar frame1">
					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="66" height="66" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M10 4a4 4 0 0 0-4 4a4 4 0 0 0 4 4a4 4 0 0 0 4-4a4 4 0 0 0-4-4m0 2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0 7c-2.67 0-8 1.33-8 4v3h9.5a6.5 6.5 0 0 1-.47-1.9H3.9V17c0-.64 3.13-2.1 6.1-2.1c.5 0 1 .05 1.5.13a6.5 6.5 0 0 1 1.05-1.74C11.61 13.1 10.71 13 10 13m7.5 0C15 13 13 15 13 17.5s2 4.5 4.5 4.5s4.5-2 4.5-4.5s-2-4.5-4.5-4.5m0 1.5c1.66 0 3 1.34 3 3c0 .56-.15 1.08-.42 1.5L16 14.92c.42-.27.94-.42 1.5-.42M14.92 16L19 20.08c-.42.27-.94.42-1.5.42c-1.66 0-3-1.34-3-3c0-.56.15-1.08.42-1.5z" fill="currentColor"></path></svg>
				</div>
				<div class="posted-by">
					<span class="profile-link post_by_account">
						<a href="#">blocked user</a>
					</span>
					<br>
					<span class="post_date">${props.postDate}</span>
				</div>
			</div>
		</td>
    `;

	return htmlToElement(html);
};

export const addDummyRows = (rows: number) => {
	const html = `
	<tr><td class="content-container">
    <div class="contentStart"></div>
    <div class="content">Кстати ребята интересный вопрос пришёл в голову. Есть ли способы увеличить урон от поджога на герое. Ну кроме снижения резиста. Типа если наложить на себя поджог с лямом ДПС и с резистом 80% то будешь получать 200к/сек. А без Реза весь лям, но силу поджога это не изменит. А вот есть ли способ увеличить именно силу самого поджога на себе. Хммм</div>
    <div class="signature"></div>
    
</td> <td class="post_info">
    <div class="post_info_content">
        <div class="post_anchor" id="p24822157"></div>        <div class="avatar frame1">
                <img src="https://web.poecdn.com/gen/image/WzAsMSx7ImlkIjowLCJzaXplIjoiYXZhdGFyIn1d/1cbf9cc398/Path_of_Exile_Gallery_Image.jpg" alt="Avatar">
        </div><div class="posted-by"><a class="posted-by-link" href="#p24822157">Сообщение</a><br><span class="profile-link post_by_account challenges-completed completed13"><a href="/account/view-profile/serjik100">serjik100</a></span><br><span class="post_date">4 дек. 2022 г., 20:10:20</span><div class="badges clearfix"></div></div><div class="buttons">                <a class="uiQuoteButton" title="Цитировать это сообщение" href="/forum/post-reply/3323562/quote/24822157" rel="nofollow"><span>Цитировать это сообщение</span></a>    <a class="uiPrivateMessageButton" title="Отправить личное сообщение" href="/private-messages/compose/to/serjik100@pc"><span>Личное сообщение</span></a></div>                <div class="report-post" data-postid="24822157" data-name="serjik100"><a href="#">Жалоба</a></div>
    </div>
</td></tr>
	`;

	const tbody = document.querySelector('tbody');
	if (!tbody) return;
	for (let i = 0; i < rows; i++) {
		tbody.insertAdjacentHTML('afterbegin', html);
	}
};
