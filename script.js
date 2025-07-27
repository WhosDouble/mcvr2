let blockSize = 0.75;
let currentBlock = "cobblestoneBlock";

const player = document.querySelector("#player");
const rightHand = document.querySelector("#blockHand");
const blockMenu = document.querySelector("#blockMenu");
const leftHand = document.querySelector("#movmentHand");
const camera = document.querySelector("#a-camera");

rightHand.addEventListener("triggerdown", function (evt) {
  let newVoxelEl = document.createElement("a-entity");
  newVoxelEl.setAttribute("mixin", currentBlock);

  let normal = evt.detail.intersection.face.normal.clone();
  normal.multiplyScalar(blockSize);

  let position = evt.detail.intersection.point.clone();
  position.add(normal);

  // grid snap
  position.x = Math.round(position.x / blockSize) * blockSize;
  position.y = Math.round(position.y / blockSize) * blockSize;
  position.z = Math.round(position.z / blockSize) * blockSize;

  newVoxelEl.setAttribute("position", position);
  newVoxelEl.classList.add("teleportable");

  this.sceneEl.appendChild(newVoxelEl);
});

rightHand.addEventListener("abuttondown", () => {
  if (blockMenu.object3D.visible) {
    blockMenu.object3D.visible = false;
  } else {
    // Get camera position and forward vector
    const camPos = camera.object3D.getWorldPosition(new THREE.Vector3());
    const camDir = new THREE.Vector3();
    camera.object3D.getWorldDirection(camDir);

    const newPos = camPos.clone().add(camDir.multiplyScalar(1));
    newPos.y = camPos.y - 0.3;

    blockMenu.object3D.position.copy(newPos);
    blockMenu.object3D.lookAt(camPos);
    blockMenu.object3D.visible = true;
  }
});

rightHand.addEventListener("gripdown", () => {
  deleteTargetedBlock();
});

blockMenu.querySelectorAll(".selectable-block").forEach((el) => {
  el.addEventListener("click", () => {
    currentBlock = el.getAttribute("mixin");
    blockMenu.object3D.visible = false;
  });
});

function deleteTargetedBlock() {
  const raycaster = rightHand.components.raycaster;

  if (!raycaster) return;

  const intersections = raycaster.intersections;
  if (intersections.length === 0) return;

  const intersectedEl = intersections[0].object.el;
  if (intersectedEl && intersectedEl.getAttribute("mixin")) {
    intersectedEl.parentNode.removeChild(intersectedEl);
  }
}
