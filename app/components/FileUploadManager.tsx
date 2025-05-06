"use client";

import { useEffect } from "react";

interface FileUploadManagerProps {
  editor: any;
  onSelect?: (asset: UploadedAsset) => void;
}

export default function FileUploadManager({
  editor,
  onSelect,
}: FileUploadManagerProps) {
  useEffect(() => {
    if (!editor) return;

    const assetManager = editor.AssetManager;
    const originalSelect = assetManager.select;

    assetManager.select = function (asset) {
      if (!asset.isImage) {
        editor.runCommand("insert-document-after", {
          src: asset.getSrc(),
          name: asset.get("name"),
        });
        return;
      }

      originalSelect.apply(this, [asset]);

      if (onSelect) {
        onSelect(asset);
      }
    };

    return () => {
      assetManager.select = originalSelect;
    };
  }, [editor, onSelect]);

  return null;
}
