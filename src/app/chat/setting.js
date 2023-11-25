'use client';

import {Slider, Modal, ModalFooter, ModalBody, ModalHeader, ModalContent, Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useContext, useState } from "react";
import { ChatContext } from "@/hooks/context";

export function Setting(props) {
  let { isOpen, onClose } = props;
  let { config, setConfig } = useContext(ChatContext);
  const [platform, setPlatform] = useState(new Set(['openai']));

  return (
    <Modal
      size="sm"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Setting</ModalHeader>
            <ModalBody>
              <Select
              label="Select platform"
              onChange={(e) => {
                if (e.target.value) {
                  setPlatform(new Set(e.target.value.split(',')))
                  setConfig({
                    ...config,
                    platform: e.target.value.split(',')[0],
                  })
                }
              }}
              selectionMode='single'
              selectedKeys={platform}
              >
                <SelectItem key="openai" value={config.platform}>OpenAI</SelectItem>
              </Select>
              <Input
                label="Base URL"
                variant="bordered"
                size="sm"
                value={config.baseUrl}
                onChange={(e) => {
                  setConfig({
                    ...config,
                    baseUrl: e.target.value
                  })
                }}
              />
              <Input
                label="API Key"
                variant="bordered"
                size="sm"
                value={config.apiKey}
                onChange={(e) => {
                  setConfig({
                    ...config,
                    apiKey: e.target.value
                  })
                }}
              />
              <Input
                label="ORG ID"
                variant="bordered"
                size="sm"
                value={config.organization}
                onChange={(e) => {
                  setConfig({
                    ...config,
                    organization: e.target.value
                  })
                }}
              />
              <Input
                label="Access Token"
                variant="bordered"
                size="sm"
                value={config.accessToken}
                onChange={(e) => {
                  setConfig({
                    ...config,
                    accessToken: e.target.value
                  })
                }}
              />
              <Input
                label="Model"
                variant="bordered"
                size="sm"
                value={config.model}
                onChange={(e) => {
                  setConfig({
                    ...config,
                    model: e.target.value
                  })
                }}
              />
              <Input
                label="System role prompt content"
                variant="bordered"
                size="sm"
                value={config.systemPrompt}
                onChange={(e) => {
                  setConfig({
                    ...config,
                    systemPrompt: e.target.value
                  })
                }}
              />
              <Slider
                label="Temperature"
                size="sm"
                step={0.1}
                maxValue={2}
                minValue={0}
                aria-label="Temperature"
                defaultValue={config.temperature}
                className="max-w-md"
                value={config.temperature}
                onChange={(e) => {
                  setConfig({
                    ...config,
                    temperature: e
                  })
                }}
              />
              <Slider
                label="Top P"
                size="sm"
                step={0.1}
                maxValue={1}
                minValue={0}
                aria-label="Top P"
                defaultValue={config.topP}
                className="max-w-md"
                value={config.topP}
                onChange={(e) => {
                  setConfig({
                    ...config,
                    topP: e
                  })
                }}
              />
              <Slider
                label="Presence penalty"
                size="sm"
                step={0.1}
                maxValue={2}
                minValue={-2}
                aria-label="Presence penalty"
                defaultValue={config.presencePenalty}
                className="max-w-md"
                value={config.presencePenalty}
                onChange={(e) => {
                  setConfig({
                    ...config,
                    presencePenalty: e
                  })
                }}
              />
              <Slider
                label="Frequency penalty"
                size="sm"
                step={0.1}
                maxValue={2}
                minValue={-2}
                aria-label="Frequency penalty"
                defaultValue={config.frequencyPenalty}
                className="max-w-md"
                value={config.frequencyPenalty}
                onChange={(e) => {
                  setConfig({
                    ...config,
                    frequencyPenalty: e
                  })
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={onClose}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
