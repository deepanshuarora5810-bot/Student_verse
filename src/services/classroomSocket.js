// Real-Time Classroom Socket Service (WebSocket client connecting to FastAPI backend)

export class ClassroomSocket {
  constructor(roomId, options = {}) {
    this.roomId = roomId;
    this.role = options.role || 'teacher'; // 'teacher' or 'student'
    this.userName = options.userName || 'Teacher Alex';
    this.callbacks = {
      onStroke: null,
      onLaser: null,
      onClear: null,
      onPageChange: null,
      onRoomState: null,
      onPermissionUpdate: null
    };

    this.socket = null;
    this.connected = false;
    this.connect();
  }

  connect() {
    // Connect to FastAPI WebSocket backend on port 8000
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.hostname || 'localhost';
    const wsUrl = `${protocol}//${host}:8000/ws/classroom/${this.roomId}`;

    try {
      this.socket = new WebSocket(wsUrl);

      this.socket.onopen = () => {
        this.connected = true;
        this.emit({
          type: 'join',
          role: this.role,
          userName: this.userName
        });
      };

      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleIncoming(data);
        } catch (e) {
          console.error('WebSocket parse error', e);
        }
      };

      this.socket.onclose = () => {
        this.connected = false;
      };

      this.socket.onerror = () => {
        this.connected = false;
      };
    } catch (e) {
      this.connected = false;
    }
  }

  handleIncoming(data) {
    if (!data || !data.type) return;

    switch (data.type) {
      case 'stroke':
        this.callbacks.onStroke && this.callbacks.onStroke(data.element, data.pageIndex);
        break;
      case 'laser':
        this.callbacks.onLaser && this.callbacks.onLaser(data.x, data.y, data.active, data.userName);
        break;
      case 'clear':
        this.callbacks.onClear && this.callbacks.onClear(data.pageIndex);
        break;
      case 'page_change':
        this.callbacks.onPageChange && this.callbacks.onPageChange(data.pageIndex);
        break;
      case 'room_state':
        this.callbacks.onRoomState && this.callbacks.onRoomState(data);
        break;
      case 'permission_update':
        this.callbacks.onPermissionUpdate && this.callbacks.onPermissionUpdate(data.allow_student_editing);
        break;
      default:
        break;
    }
  }

  emit(data) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    }
  }

  sendStroke(element, pageIndex) {
    this.emit({
      type: 'stroke',
      element,
      pageIndex,
      userName: this.userName
    });
  }

  sendLaserPointer(x, y, active) {
    this.emit({
      type: 'laser',
      x,
      y,
      active,
      userName: this.userName
    });
  }

  sendClearPage(pageIndex) {
    this.emit({
      type: 'clear',
      pageIndex
    });
  }

  sendPageChange(pageIndex) {
    this.emit({
      type: 'page_change',
      pageIndex
    });
  }

  sendPermissionToggle(allowStudentEditing) {
    this.emit({
      type: 'permission_toggle',
      allow_student_editing: allowStudentEditing
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}
