import { world } from "@minecraft/server";

const EntityProps = {
  Creeper: {
    name: "minecraft:creeper",
    chance: 18,
  },
};

world.afterEvents.entityDie.subscribe((ev) => {
  const { damageSource, deadEntity } = ev;
  const player = damageSource.damagingEntity;
  if (player?.typeId !== "minecraft:player") return;

  Object.keys(EntityProps).forEach((entityKey) => {
    const entityProp = EntityProps[entityKey];
    if (
      entityProp.name === deadEntity.typeId &&
      Math.random() <= entityProp.chance / 100 &&
      !player.hasTag(entityKey)
    ) {
      player.addTag(entityKey);
      player.sendMessage(`§aYou have acquired the traits of §g${entityKey}`);
    }
  });
});
