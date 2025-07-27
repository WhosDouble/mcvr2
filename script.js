document.querySelector("#blockHand").addEventListener(`click`, function (evt) {
  // creating a blank entity
  let newVoxelEl = document.createElement("a-entity");

  // using the mixen to make it a voxel
  newVoxelEl.setAttribute("mixin", "voxel");

  //getting the normal of the face intersection and scaling down
  let normal = evt.detail.intersection.face.normal;
  normal.multiplyScalar(0.25);

  // setting the position usint intersection and adding the scaled normal
  let position = evt.detail.intersection.point;
  position.add(normal);

  //setting the position with intersection pont
  newVoxelEl.setAttribute("position", position);

  //adding this new block to the scene
  this.appendChild(newVoxelEl);
});
