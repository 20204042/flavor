export function validateForm(event) {
  if (event) {
    event.preventDefault();
  }

  const userId = document.getElementById('user_id').value;
  const userPw = document.getElementById('user_pw').value;
  const userIdError = document.getElementById('user_id_error');
  const userPwError = document.getElementById('user_pw_error');

  // 아이디 유효성 검사
  if (userId === '') {
    userIdError.innerText = '아이디를 입력해주세요.';
    userIdError.style.display = 'block';
  } else {
    userIdError.style.display = 'none'; // 수정: 'display' 속성
  }

  // 비밀번호 유효성 검사
  if (userPw === '') {
    userPwError.innerText = '비밀번호를 입력해주세요.';
    userPwError.style.display = 'block';
  } else {
    userPwError.style.display = 'none'; // 수정: 'display' 속성
  }
}

export function hideIdError() {
  const userId = document.getElementById('user_id').value;
  const userIdError = document.getElementById('user_id_error');

  if (userId !== '') {
    userIdError.style.display = 'none';
  }
}

export function hidePasswordError() {
  const userPw = document.getElementById('user_pw').value;
  const userPwError = document.getElementById('user_pw_error');

  if (userPw !== '') {
    userPwError.style.display = 'none';
  }
}

export function checkCapsLock(event) {
  const capsLockWarning = document.getElementById('caps_lock_warning');
  const capsLockEnabled = event.getModifierState && event.getModifierState('CapsLock');

  if (capsLockEnabled) {
    capsLockWarning.innerText = 'Caps Lock이 켜져있습니다.';
    capsLockWarning.style.display = 'block';
  } else {
    capsLockWarning.style.display = 'none';
  }
}