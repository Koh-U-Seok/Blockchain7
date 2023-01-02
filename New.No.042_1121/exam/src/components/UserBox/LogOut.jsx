export default function LogOut({ user, setUser }) {
  return (
    <div>
      {!user || `${user}님 어서오세요.`}
      {/* || 는 '또는' 앞에 것이 아니면 뒤에 것을 출력한다. */}
      <button
        onClick={() => {
          setUser("");
        }}
      >
        LogOut
      </button>
    </div>
  );
}
