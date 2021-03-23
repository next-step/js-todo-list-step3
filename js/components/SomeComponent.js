/**
 *
 * @param $el 해당 컴포넌트가 랜더링 될 영역
 * @param props 부모로부터 받은 상태
 * @param callback 부모로부터 받은 콜백함수 {}
 */
export default function SomeComponent($el, props, callback) {

	/**
	 * 컴포넌트 내부에 이벤트 바인딩 (이벤트 위임 활용)
	 */
	const bindEvents = () => {

	};

	/**
	 * 랜더링 함수
	 */
	const render = () => {

		this.$el.innerHTML = `
		`;
	};

	/**
	 * 컴포넌트 상태 변경
	 */
	this.setState = (nextState) => {

		this.state = {
			...this.state,
			...nextState,
		};

		render();
	};

	/**
	 * 컴포넌트 생성 시 호출
	 */
	const init = () => {

		this.$el = $el;
		this.state = props;
		this.components = {}; //자식 컴포넌트

		render();
		bindEvents();
	};

	init();
}
